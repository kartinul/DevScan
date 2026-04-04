import React from "react";
import type { Verdict } from "../../types";

interface VerdictMeta {
  label: string;
  color: string;
  bg: string;
  border: string;
}

export const VERDICT_CONFIG: Record<Verdict, VerdictMeta> = {
  verified: {
    label: "✓ Verified",
    color: "#39d353",
    bg: "rgba(57,211,83,.08)",
    border: "rgba(57,211,83,.3)",
  },
  partial: {
    label: "⚡ Partial",
    color: "#e3b341",
    bg: "rgba(227,179,65,.07)",
    border: "rgba(227,179,65,.3)",
  },
  inflated: {
    label: "⚠ Inflated",
    color: "#f78166",
    bg: "rgba(247,129,102,.06)",
    border: "rgba(247,129,102,.3)",
  },
  missing: {
    label: "✗ No evidence",
    color: "#7d8590",
    bg: "transparent",
    border: "#21262d",
  },
  bonus: {
    label: "★ Bonus find",
    color: "#d2a8ff",
    bg: "rgba(210,168,255,.06)",
    border: "rgba(210,168,255,.3)",
  },
};

interface VerdictChipProps {
  verdict: Verdict;
  style?: React.CSSProperties;
}

export const VerdictChip: React.FC<VerdictChipProps> = ({ verdict, style }) => {
  const cfg = VERDICT_CONFIG[verdict];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: ".64rem",
        border: `1px solid ${cfg.border}`,
        background: cfg.bg,
        color: cfg.color,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {cfg.label}
    </div>
  );
};
