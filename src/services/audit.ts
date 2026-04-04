import { Candidate } from "../types";
import { fetchGitHubData } from "./github";
import { analyzeWithAI } from "./ai";
import { extractTextFromFile } from "./ocr";

/**
 * Orchestrator that performs the full audit flow.
 */
export async function performFullAudit(
  file: File,
  githubUsername: string,
  fileIndex: number,
  onStep: (step: number) => void,
): Promise<Candidate> {
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
    ...aiResult,
    filename: file.name,
  };

  console.log(result);

  // 5. Finalize report
  onStep(4);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return result;
}
