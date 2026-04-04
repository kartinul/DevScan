import React, { useMemo } from "react";
import { colors } from "../../theme";
import type { CandidateStats } from "../../types";

const COLS = 26;
const ROWS = 7;
const BASE_PATTERN = [
  0, 1, 1, 2, 3, 4, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 3, 4, 4, 3, 2, 1, 3, 2,
];
const LEVEL_COLORS = [
  "transparent",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

interface ActivityHeatmapProps {
  stats: CandidateStats;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ stats }) => {
  // Generate a stable heatmap grid
  const cells = useMemo(() => {
    return Array.from({ length: ROWS * COLS }, (_, i) => {
      const col = i % COLS;
      const base = BASE_PATTERN[col];
      return Math.max(0, Math.min(4, base + Math.floor(Math.random() * 3) - 1));
    });
  }, []); // intentionally empty — grid is stable per mount

  return (
    <div>
      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: 2.5,
        }}
      >
        {cells.map((level, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              borderRadius: 2,
              background: level === 0 ? colors.surface2 : LEVEL_COLORS[level],
            }}
          />
        ))}
      </div>

      {/* Time labels */}
      <div
        style={{
          fontSize: ".61rem",
          color: colors.muted,
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>6 months ago</span>
        <span>Today</span>
      </div>

      {/* Stats row */}
      <div
        style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}
      >
        {(
          [
            ["🔥", "Commits", `${stats.commits}/yr`],
            ["⭐", "Stars", `${stats.stars}`],
            ["📅", "Active", `${stats.activeMo}mo`],
          ] as const
        ).map(([icon, label, val]) => (
          <div key={label} style={{ fontSize: ".68rem", color: colors.muted }}>
            {icon} <strong style={{ color: colors.text }}>{val}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityHeatmap;
