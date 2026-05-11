/**
 * AI Engine: Implementation for Gemini with fallback.
 */

async function callGeminiAPI(prompt: string, model: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    let errorMessage = `Unknown error`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message ?? errorMessage;
    } catch (e) {
      errorMessage = `HTTP status ${response.status}`;
    }
    throw new Error(`Gemini error (${model}): ${errorMessage}`);
  }

  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!answer) throw new Error(`No content returned from Gemini (${model})`);
  return answer;
}

export async function askGeminiWithFallback(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY environment variable");
  }

  const modelsToTry = [
    "gemini-3-flash-preview", // The correct API string for Gemini 3 Flash
    "gemini-2.5-flash",       // Fallback to 2.5 Flash
  ];

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      console.log(`[AI] Attempting to use ${model}...`);
      return await callGeminiAPI(prompt, model, apiKey);
    } catch (error) {
      console.warn(`[AI] Model ${model} failed:`, error);
      lastError = error as Error;
    }
  }

  // If we exhaust all models, throw the last error we got
  throw new Error(`All Gemini models failed. Last error: ${lastError?.message}`);
}

