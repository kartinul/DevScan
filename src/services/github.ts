import { graphql } from "@octokit/graphql";
// @ts-ignore - Vite raw import
import GITHUB_AUDIT_QUERY from "./queries.graphql?raw";
import { GH_MOCK_USERS } from "../data";

/**
 * MOCK: Extract GitHub username from resume file.
 */
export async function detectGitHubUser(file: File, fileIndex: number = 0): Promise<string | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));
    return GH_MOCK_USERS[fileIndex % GH_MOCK_USERS.length] || null;
  } catch (err) {
    console.warn("GitHub Detection Error, falling back to mock:", err);
    return GH_MOCK_USERS[0];
  }
}

/**
 * Fetches contribution and repository data from GitHub GraphQL API.
 * Returns mock data if error occurs.
 */
export async function fetchGitHubData(username: string, token?: string): Promise<any> {
  const mockResult = { username, repos: [], mock: true, date: new Date().toISOString() };

  if (!token) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockResult;
  }

  try {
    const data = await graphql(GITHUB_AUDIT_QUERY, {
      login: username,
      headers: {
        authorization: `token ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.warn(`GraphQL Fetch Error for ${username}, returning mock:`, error);
    return mockResult;
  }
}
