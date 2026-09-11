/**
 * AI Engine: Implementation for Gemini with load-balancing fallback.
 */

const MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3-flash",
  "gemini-2.5-flash"
];

const RPM_LIMIT = 5;
const RPD_LIMIT = 20;

type UsageData = {
  timestamps: number[];
  dayCount: number;
  lastReset: number;
  cooldownUntil: number;
};

let API_KEYS: string[] = [];
let usageState: Record<string, Record<string, UsageData>> = {};
let isInitialized = false;

function initUsageState() {
  if (isInitialized) return;

  const rawKeys = import.meta.env.VITE_GEMINI_API_KEYS || "";
  API_KEYS = rawKeys.split(",").map((k: string) => k.trim()).filter(Boolean);

  if (!API_KEYS.length) {
    throw new Error("No keys found! Set VITE_GEMINI_API_KEYS=\"key1,key2,key3\" in .env");
  }

  for (const key of API_KEYS) {
    usageState[key] = {};
    for (const model of MODELS) {
      usageState[key][model] = {
        timestamps: [],
        dayCount: 0,
        lastReset: Date.now(),
        cooldownUntil: 0,
      };
    }
  }
  
  isInitialized = true;
  console.log(`[AI] Engine initialized. Loaded ${API_KEYS.length} API keys.`);
}

function getAvailableSlot(): { key: string; model: string } | null {
  initUsageState();
  const now = Date.now();

  for (const model of MODELS) {
    for (const key of API_KEYS) {
      const data = usageState[key][model];

      if (now - data.lastReset > 86400 * 1000) {
        data.dayCount = 0;
        data.lastReset = now;
        data.cooldownUntil = 0;
      }

      if (now < data.cooldownUntil) {
        continue;
      }

      data.timestamps = data.timestamps.filter((t) => now - t < 60 * 1000);

      if (data.timestamps.length < RPM_LIMIT && data.dayCount < RPD_LIMIT) {
        return { key, model };
      }
    }
  }

  return null;
}

export async function askGeminiWithFallback(prompt: string): Promise<string> {
  initUsageState();
  let lastError: Error | null = null;
  const maxAttempts = MODELS.length * API_KEYS.length;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const slot = getAvailableSlot();
    if (!slot) {
      if (!lastError) {
        throw new Error("Rate Limit Hit: All Gemini keys and models are currently maxed out or cooling down.");
      }
      break; // Exit loop to throw last error
    }
    
    const { key, model } = slot;
    
    const data = usageState[key][model];
    data.timestamps.push(Date.now());
    data.dayCount += 1;

    const maskedKey = `...${key.slice(-4)}`;
    console.log(`[AI] Routing -> Model: ${model} | Key: ${maskedKey} | RPM: ${data.timestamps.length}/${RPM_LIMIT} | RPD: ${data.dayCount}/${RPD_LIMIT}`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
    } catch (error) {
      console.error(`[AI] Fetch failed:`, error);
      lastError = error as Error;
      continue;
    }

    if (!response.ok) {
      let errorText = "";
      try {
        const errorData = await response.json();
        errorText = JSON.stringify(errorData);
      } catch {
        errorText = await response.text();
      }
      
      console.error(`[AI] Google API Error [${response.status}]: ${errorText}`);
      
      if (response.status === 429) {
        if (errorText.includes("PerDay")) {
          data.cooldownUntil = Date.now() + 86400 * 1000;
          console.warn(`[AI] Daily quota exhausted for ${model} on key ${maskedKey}. Blacklisted for 24h.`);
        } else {
          data.cooldownUntil = Date.now() + 60 * 1000;
          console.warn(`[AI] RPM rate limit hit for ${model} on key ${maskedKey}. Cooling down for 60s.`);
        }
      } else if (response.status === 503) {
        data.cooldownUntil = Date.now() + 15 * 1000;
        console.warn(`[AI] Server overloaded for ${model} on key ${maskedKey}. Cooling down for 15s.`);
      }

      lastError = new Error(`Gemini API Error [${response.status}]: ${errorText}`);
      continue;
    }

    const dataRes = await response.json();
    const answer = dataRes.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) {
      lastError = new Error(`No content returned from Gemini (${model})`);
      continue;
    }
    return answer;
  }

  throw new Error(`All Gemini attempts failed. Last error: ${lastError?.message}`);
}
