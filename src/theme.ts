export const colors = {
  bg: "#090c10",
  surface: "#0d1117",
  surface2: "#161b22",
  surface3: "#1c2128",
  border: "#21262d",
  border2: "#30363d",
  accent: "#39d353",
  accent2: "#58a6ff",
  accent3: "#f78166",
  accent4: "#d2a8ff",
  text: "#e6edf3",
  muted: "#7d8590",
  warn: "#e3b341",
} as const;

export const fonts = {
  mono: "'JetBrains Mono', monospace",
  display: "'Syne', sans-serif",
} as const;

export const theme = { colors, fonts } as const;
