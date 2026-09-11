import { Candidate } from "../types";
import { fetchGitHubData } from "./github";
import { analyzeWithAI } from "./ai";
import { extractTextFromFile } from "./ocr";

export async function performFullAudit(
  file: File,
  githubUsername: string,
  fileIndex: number,
  onStep: (step: number) => void,
): Promise<Candidate> {
  onStep(0);
  const extractedText = await extractTextFromFile(file);

  onStep(1);
  await new Promise((resolve) => setTimeout(resolve, 300));

  onStep(2);
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
  const githubData = await fetchGitHubData(githubUsername, githubToken);

  onStep(3);
  const aiResult = await analyzeWithAI(extractedText, githubData, fileIndex);

  const safeAiResult = aiResult && typeof aiResult === 'object' ? aiResult : {};

  const result: Candidate = {
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

    ...(safeAiResult as Partial<Candidate>),

    id: String(Date.now() + fileIndex),
    filename: file.name,
    github: githubData.username,
    file: file,
    mock: (safeAiResult as any).mock || githubData.mock || false,
  };

  console.log("[Audit] Final result prepared.");

  onStep(4);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return result;
}
