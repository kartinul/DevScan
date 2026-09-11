export type Verdict = "verified" | "partial" | "inflated" | "missing" | "bonus";

export interface Claim {
  category: string;
  text: string;
  quote: string;
  verdict: Verdict;
  confidence: number;
  evidence: string[];
}

export interface Skill {
  name: string;
  resumePct: number;
  githubPct: number;
  verdict: Verdict;
}

export interface Repo {
  name: string;
  lang: string;
  stars: number;
  months: number;
  claimMatches: string[];
}

export type FlagType = "red" | "green" | "warn";

export interface Flag {
  type: FlagType;
  title: string;
  desc: string;
}

export type SummaryPartType =
  | "text"
  | "bold"
  | "green"
  | "red"
  | "warn"
  | "break";

export interface SummaryPart {
  type: SummaryPartType;
  content?: string;
}

export interface CandidateStats {
  commits: number;
  repos: number;
  stars: number;
  activeMo: number;
}

export interface Candidate {
  id: string;
  name: string;
  filename: string;
  github: string;
  score: number;
  verdict: string;
  verdictVariant: "strong" | "moderate" | "weak";
  stats: CandidateStats;
  claims: Claim[];
  skills: Skill[];
  repos: Repo[];
  flags: Flag[];
  summary: SummaryPart[];
  mock?: boolean;
  file?: File;
}

export interface UploadedFile {
  id: number;
  name: string;
  size: number;
  github: string | null;
  detecting: boolean;
  file: File;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  languages: string[];
  packageJson?: string | null;
  requirementsTxt?: string | null;
  readme?: string | null;
  url: string;
  updatedAt: string;
}

export interface GitHubData {
  username: string;
  name?: string | null;
  bio?: string | null;
  avatarUrl?: string;
  repos: GitHubRepo[];
  linesMap: Record<string, number>;
  mock?: boolean;
}

export interface ScanState {
  fileIndex: number;
  currentFile: string;
  currentStep: number;
  totalFiles: number;
}
