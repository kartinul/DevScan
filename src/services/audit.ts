import { Candidate } from "../types";
import { fetchGitHubData } from "./github";
import { analyzeWithAI } from "./ai";

/**
 * Orchestrator that performs the full audit flow.
 */
export async function performFullAudit(
  file: File, 
  githubUsername: string, 
  fileIndex: number,
  onStep: (step: number) => void
): Promise<Candidate> {
  // 1. Parsing step
  onStep(0);
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // 2. Detection (already passed from the hook)
  onStep(1);
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // 3. Fetch GitHub data
  onStep(2);
  const githubData = await fetchGitHubData(githubUsername);
  
  // 4. Cross-reference claims (AI Step)
  onStep(3);
  const result = await analyzeWithAI(file, githubData, fileIndex);
  
  // 5. Finalize report
  onStep(4);
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  return result;
}
