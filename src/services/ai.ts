import { Candidate, GitHubData } from "../types";
import { MOCK_CANDIDATES } from "../data";
// @ts-ignore - Vite raw import
import AUDIT_PROMPT from "./prompt.txt?raw";

// ─── TESTING ONLY: Toggle for manual console input ──────────────────────────
const USE_MANUAL_INPUT = true;

/**
 * Analyze resume claims against GitHub evidence using AI logic.
 * Returns mock data if error occurs.
 */
export async function analyzeWithAI(
  extractedText: string,
  githubData: GitHubData,
  fileIndex: number = 0,
): Promise<Candidate> {
  const mock = MOCK_CANDIDATES[fileIndex % MOCK_CANDIDATES.length];

  try {
    const finalPrompt =
      AUDIT_PROMPT +
      `\n\n\nGITHUB_DATA:${JSON.stringify(githubData)}\n\n\nRESUME_TEXT:\n${extractedText}`;

    console.log("[AI] Prompt prepared (length):", finalPrompt.length);
    console.log({ finalPrompt });

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

    // Simulate AI delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 500),
    );

    // In production, you would call Gemini/Claude here with `finalPrompt`
    return {
      ...mock,
      id: `${mock.id}-${Date.now()}`,
      name: mock.name,
      github: githubData.username || mock.github,
      mock: githubData.mock || false,
    };
  } catch (error) {
    console.warn("AI Analysis error, returning mock:", error);
    return { ...mock, mock: true };
  }
}
