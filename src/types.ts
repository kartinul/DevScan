// ─── Verdict ────────────────────────────────────────────────────────────────
export type Verdict = "verified" | "partial" | "inflated" | "missing" | "bonus";

// ─── Claim ──────────────────────────────────────────────────────────────────
export interface Claim {
  category: string;
  text: string;
  quote: string;
  verdict: Verdict;
  confidence: number;
  evidence: string[];
}

// ─── Skill ──────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  resumePct: number;
  githubPct: number;
  verdict: Verdict;
}

// ─── Repo ───────────────────────────────────────────────────────────────────
export interface Repo {
  name: string;
  lang: string;
  stars: number;
  months: number;
  claimMatches: string[];
}

// ─── Flag ───────────────────────────────────────────────────────────────────
export type FlagType = "red" | "green" | "warn";

export interface Flag {
  type: FlagType;
  title: string;
  desc: string;
}

// ─── AI Summary ──────────────────────────────────────────────────────────────
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

// ─── Candidate ──────────────────────────────────────────────────────────────
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
}

// ─── Uploaded File ───────────────────────────────────────────────────────────
export interface UploadedFile {
  id: number;
  name: string;
  size: number;
  github: string | null;
  detecting: boolean;
}

// ─── Scan State ─────────────────────────────────────────────────────────────
export interface ScanState {
  fileIndex: number;
  currentFile: string;
  currentStep: number;
  totalFiles: number;
}
