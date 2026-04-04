import { Candidate, GitHubData } from "../types";
import { MOCK_CANDIDATES } from "../data";
import { askGemini, askGroq } from "./aiEngine";
// @ts-ignore - Vite raw import
import AUDIT_PROMPT from "./prompt.txt?raw";

// ─── TESTING ONLY: Toggle for manual console input ──────────────────────────
const USE_MANUAL_INPUT = true;

/**
 * Analyze resume claims against GitHub evidence using AI logic.
 */
export async function analyzeWithAI(
  extractedText: string,
  githubData: GitHubData,
  fileIndex: number = 0,
): Promise<Partial<Candidate>> {
  let finalPrompt = "";
  try {
    finalPrompt =
      AUDIT_PROMPT +
      `\n\nGITHUB_DATA:\n${JSON.stringify(githubData, null, 2)}\n\nRESUME_TEXT:\n${extractedText}`;

    console.log("[AI] Prompt prepared (length):", finalPrompt.length);

    // ─── MANUAL INPUT MODE (TESTING) ───
    if (USE_MANUAL_INPUT) {
      console.warn("⚠️ [AI] MANUAL INPUT MODE ENABLED");
      console.log(
        "[AI] Waiting for result... Run this in your console to continue:",
      );
      console.log(
        `%cwindow.setAIResult({ ...your_json_here })`,
        "color: #39d353; font-weight: bold; font-family: monospace;",
      );

      return new Promise((resolve) => {
        (window as any).setAIResult = (manualResult: Candidate) => {
          console.log("[AI] Manual result received via console.");
          resolve(manualResult);
        };
      });
    }

    // ─── REAL AI CALL ───
    console.log("[AI] Calling Groq...");
    const responseText = await askGroq(finalPrompt);

    // Clean up response
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    const aiResult = JSON.parse(cleanJson);

    console.log("[AI] Successfully parsed response.");
    return aiResult;
  } catch (error) {
    console.error("AI Analysis error, returning prompt as mock:", error);
    return {
      name: "AI Error / Prompt Debug",
      score: 0,
      verdict: "Error",
      verdictVariant: "weak",
      stats: { commits: 0, repos: 0, stars: 0, activeMo: 0 },
      claims: [
        {
          category: "Extra",
          text: "Raw Prompt Output",
          quote: "Error occurred",
          verdict: "missing",
          confidence: 0,
          evidence: ["Check the summary for the prompt."],
        },
      ],
      skills: [],
      repos: [],
      flags: [
        {
          type: "red",
          title: "AI Failed",
          desc: String(error),
        },
      ],
      summary: [
        { type: "bold", content: "Prompt Debug:" },
        { type: "break" },
        {
          type: "text",
          content: finalPrompt.substring(0, 3000) + "\n...[TRUNCATED]",
        },
      ],
      mock: true,
    };
  }
}

// ─── Shared OpenRouter fetch helper ─────────────────────────────────────────
async function askOpenRouter(prompt: string, model: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `OpenRouter error ${response.status}: ${error.error?.message ?? "Unknown error"}`,
    );
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;
  if (!answer) throw new Error(`No content returned from ${model}`);
  return answer;
}

export async function askGptOSS(prompt: string): Promise<string> {
  return askOpenRouter(prompt, "openai/gpt-oss-120b:free");
}

export async function askLiquidThinking(prompt: string): Promise<string> {
  return askOpenRouter(prompt, "liquid/lfm-2.5-1.2b-thinking:free");
}

export async function askQwen(prompt: string): Promise<string> {
  return askOpenRouter(prompt, "qwen/qwen3.6-plus:free");
}

/* 
// ─── Run all three example ───────────────────────────────────────────────────────────
const Abc = "Explain black holes in one sentence.";

const [gpt, liquid, qwen] = await Promise.all([
  askGptOSS(Abc),
  askLiquidThinking(Abc),
  askQwen(Abc),
]);

console.log("GPT-OSS 120B:  ", gpt);
console.log("Liquid Thinking:", liquid);
console.log("Qwen3.6 Plus:  ", qwen);
*/
