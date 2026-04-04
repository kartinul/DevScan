import React from "react";
import { colors } from "../../theme";
import type { SummaryPart } from "../../types";

const PART_COLORS: Partial<Record<SummaryPart["type"], string>> = {
  green: colors.accent,
  red: colors.accent3,
  warn: colors.warn,
};

interface AISummaryProps {
  summary: SummaryPart[];
}

export const AISummary: React.FC<AISummaryProps> = ({ summary }) => (
  <div style={{ fontSize: ".79rem", lineHeight: 1.95, color: colors.muted }}>
    {summary.map((part, i) => {
      if (part.type === "break") return <br key={i} />;

      if (part.type === "bold") {
        return (
          <strong key={i} style={{ color: colors.text }}>
            {part.content}
          </strong>
        );
      }

      const color = PART_COLORS[part.type];
      if (color) {
        return (
          <span key={i} style={{ color }}>
            {part.content}
          </span>
        );
      }

      return <span key={i}>{part.content}</span>;
    })}
    {/* Blinking cursor at end */}
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 13,
        background: colors.accent,
        verticalAlign: "middle",
        marginLeft: 4,
        animation: "blink .9s step-start infinite",
      }}
    />
  </div>
);

export default AISummary;
