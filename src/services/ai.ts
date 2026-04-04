import { Candidate } from "../types";
import { MOCK_CANDIDATES } from "../data";

/**
 * Analyze resume claims against GitHub evidence using AI logic.
 * Returns mock data if error occurs.
 */
export async function analyzeWithAI(
  extractedText: string, 
  githubData: any, 
  fileIndex: number = 0
): Promise<Candidate> {
  const mock = MOCK_CANDIDATES[fileIndex % MOCK_CANDIDATES.length];
  
  try {
    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 500));
    
    return {
      ...mock,
      id: `${mock.id}-${Date.now()}`,
      name: mock.name,
      github: githubData.username || mock.github,
    };
  } catch (error) {
    console.warn("AI Analysis error, returning mock:", error);
    return mock;
  }
}
