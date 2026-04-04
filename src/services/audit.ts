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
  onStep: (step: number) => void
): Promise<Candidate> {
  // 1. Parsing & OCR step
  onStep(0);
  const extractedText = await extractTextFromFile(file);
  
  // 2. Detection (already passed from the hook, adding mock delay)
  onStep(1);
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // 3. Fetch GitHub data using GraphQL
  onStep(2);
  const githubData = await fetchGitHubData(githubUsername);
  
  // 4. Cross-reference claims (AI Step)
  onStep(3);
  const result = await analyzeWithAI(extractedText, githubData, fileIndex);
  
  // 5. Finalize report
  onStep(4);
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return result;
}
