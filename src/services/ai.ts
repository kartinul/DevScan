import { Candidate } from "../types";
import { MOCK_CANDIDATES } from "../data";

/**
 * MOCK: Analyze resume claims against GitHub evidence using AI logic.
 */
export async function analyzeWithAI(
  file: File, 
  githubData: any, 
  fileIndex: number = 0
): Promise<Candidate> {
  // Simulate heavy AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Return a mock candidate object as a result
  const mock = MOCK_CANDIDATES[fileIndex % MOCK_CANDIDATES.length];
  
  return {
    ...mock,
    id: `${mock.id}-${Date.now()}`,
    name: file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").toUpperCase(),
    filename: file.name,
    github: githubData.username || mock.github,
  };
}
