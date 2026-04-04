// ─── Color palette ──────────────────────────────────────────────────────────
export const colors = {
  bg: "#090c10",
  surface: "#0d1117",
  surface2: "#161b22",
  surface3: "#1c2128",
  border: "#21262d",
  border2: "#30363d",
  accent: "#39d353", // green  — verified / positive
  accent2: "#58a6ff", // blue   — links / neutral info
  accent3: "#f78166", // red    — flags / inflated
  accent4: "#d2a8ff", // purple — bonus
  text: "#e6edf3",
  muted: "#7d8590",
  warn: "#e3b341", // yellow — partial / caution
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────
export const fonts = {
  mono: "'JetBrains Mono', monospace",
  display: "'Syne', sans-serif",
} as const;

// ─── Convenience re-export ───────────────────────────────────────────────────
export const theme = { colors, fonts } as const;
export type Theme = typeof theme;
