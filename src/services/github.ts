import { GH_MOCK_USERS } from "../data";

/**
 * MOCK: Extract GitHub username from resume file.
 * In production, this would use a PDF/Doc parser or an LLM.
 */
export async function detectGitHubUser(file: File, fileIndex: number = 0): Promise<string | null> {
  // Simulate network/parsing delay
  await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 1000));
  
  // Return a mock user based on index
  return GH_MOCK_USERS[fileIndex % GH_MOCK_USERS.length] || null;
}

/**
 * MOCK: Fetch contribution and repository data from GitHub API.
 */
export async function fetchGitHubData(username: string): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));
  
  return {
    username,
    fetchDate: new Date().toISOString(),
    // This would contain raw repos, commits, etc.
  };
}
