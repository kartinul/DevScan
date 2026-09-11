import { graphql } from "@octokit/graphql";
// @ts-ignore - Vite raw import
import GITHUB_AUDIT_QUERY from "./queries.graphql?raw";
import { GH_MOCK_USERS } from "../data";
import { GitHubData, GitHubRepo } from "../types";
import { extractTextFromFile } from "./ocr";

export function detectGitHubUserFromText(text: string): string | null {
  const regex = /(?:github\.com\/)(?!orgs\/|settings\/|marketplace\/)([a-zA-Z0-9-]{1,39})/i;
  const match = text.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  const twitterStyleRegex = /(?:^|\s)@([a-zA-Z0-9-]{1,39})(?!\.[a-zA-Z])/i;
  const twitterMatch = text.match(twitterStyleRegex);

  return twitterMatch ? twitterMatch[1] : null;
}

export async function detectGitHubUser(
  file: File,
  fileIndex: number = 0,
): Promise<string | null> {
  try {
    const text = await extractTextFromFile(file);

    const detected = detectGitHubUserFromText(text);

    if (detected) {
      console.log(`[Detection] Found GitHub handle in text: ${detected}`);
      return detected;
    }

    console.warn(`[Detection] No handle found in ${file.name}, using mock fallback.`);
    return GH_MOCK_USERS[fileIndex % GH_MOCK_USERS.length] || null;
  } catch (err) {
    console.warn("GitHub Detection Error, falling back to mock:", err);
    return GH_MOCK_USERS[fileIndex % GH_MOCK_USERS.length] || null;
  }
}

export async function fetchGitHubData(
  username: string,
  token?: string,
): Promise<GitHubData> {
  const mockResult: GitHubData = {
    username,
    repos: [],
    linesMap: {},
    mock: true,
  };

  if (!token) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockResult;
  }

  try {
    const data: any = await graphql(GITHUB_AUDIT_QUERY, {
      login: username,
      headers: {
        authorization: `token ${token}`,
      },
    });

    if (!data.user) return mockResult;

    const linesMap: Record<string, number> = {};
    const repos: GitHubRepo[] = data.user.repositories.nodes.map((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const langName = edge.node.name;
        const estimatedLines = Math.round(edge.size / 50);
        linesMap[langName] = (linesMap[langName] || 0) + estimatedLines;
      });

      return {
        name: repo.name,
        description: repo.description,
        stargazerCount: repo.stargazerCount,
        forkCount: repo.forkCount,
        languages: repo.languages.edges.map((edge: any) => edge.node.name),
        packageJson: repo.packageJson?.text || null,
        requirementsTxt: repo.requirementsTxt?.text || null,
        readme: repo.readme?.text || null,
        url: repo.url,
        updatedAt: repo.updatedAt,
      };
    });

    return {
      username,
      name: data.user.name,
      bio: data.user.bio,
      avatarUrl: data.user.avatarUrl,
      repos,
      linesMap,
      mock: false,
    };
  } catch (error) {
    console.warn(`GraphQL Fetch Error for ${username}, returning mock:`, error);
    return mockResult;
  }
}
