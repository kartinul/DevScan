import { Candidate } from "../types";
import { fetchGitHubData } from "./github";
import { analyzeWithAI } from "./ai";
import { extractTextFromFile } from "./ocr";
import { askChatGPT, askGemini, askGroq } from "./aiEngine";

/**
 * Orchestrator that performs the full audit flow.
 */
export async function performFullAudit(
  file: File,
  githubUsername: string,
  fileIndex: number,
  onStep: (step: number) => void,
): Promise<Candidate> {
  // const res = await askChatGPT("hi");
  // const res = await askGemini("hi");
  // const res = await askQwen("hi");
  // console.log(res);

  // console.log(gqtest);

  // 1. Parsing & OCR step
  onStep(0);
  const extractedText = await extractTextFromFile(file);
  console.log(extractedText);

  // 2. Detection (already passed from the hook, adding mock delay)
  onStep(1);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 3. Fetch GitHub data using GraphQL
  onStep(2);
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
  const githubData = await fetchGitHubData(githubUsername, githubToken);
  console.log(githubData);
  console.log(JSON.stringify(githubData));

  // 4. Cross-reference claims (AI Step)
  onStep(3);
  const aiResult = await analyzeWithAI(extractedText, githubData, fileIndex);

  const result: Candidate = {
    // Default fallback values if AI omits them
    name: "Unknown Candidate",
    score: 0,
    verdict: "Unverified",
    verdictVariant: "moderate",
    stats: { commits: 0, repos: 0, stars: 0, activeMo: 0 },
    claims: [],
    skills: [],
    repos: [],
    flags: [],
    summary: [],

    // Fill in AI fields, overriding defaults
    ...(aiResult as any),

    // Override session-specific ones
    id: String(Date.now() + fileIndex),
    filename: file.name,
    github: githubData.username,
    file: file,
    mock: (aiResult as any).mock || githubData.mock || false,
  };

  console.log(result);

  // 5. Finalize report
  onStep(4);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return result;
}
