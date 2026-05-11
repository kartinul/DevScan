import { Candidate, GitHubData } from "../types";
import { askGeminiWithFallback } from "./aiEngine";
// @ts-ignore - Vite raw import
import AUDIT_PROMPT from "./prompt.txt?raw";

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

    // ─── REAL AI CALL ───
    console.log("[AI] Calling Gemini...");
    const responseText = await askGeminiWithFallback(finalPrompt);

    // Clean up response: remove markdown code block delimiters and any language tags
    const cleanJson = responseText.replace(/```[a-zA-Z]*\n?|```/gi, "").trim();
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
