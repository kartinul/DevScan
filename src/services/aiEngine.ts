/**
 * AI Engine: Implementation for OpenAI, Gemini, and Groq.
 */

// ─── OpenAI (GPT-4o mini) ───────────────────────────────────────
export async function askChatGPT(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `OpenAI error ${response.status}: ${error.error?.message ?? "Unknown error"}`,
    );
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;
  if (!answer) throw new Error("No content returned from OpenAI");
  return answer;
}

// ─── Google Gemini (gemini-2.0-flash) ────────────────────────────
export async function askGemini(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Gemini error ${response.status}: ${error.error?.message ?? "Unknown error"}`,
    );
  }

  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!answer) throw new Error("No content returned from Gemini");
  return answer;
}

// ─── Groq (llama-3.3-70b) ───────────────────────────────────────
export async function askGroq(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Groq error ${response.status}: ${error.error?.message ?? "Unknown error"}`,
    );
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;
  if (!answer) throw new Error("No content returned from Groq");
  return answer;
}
