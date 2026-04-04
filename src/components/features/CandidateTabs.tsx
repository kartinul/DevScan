import React from "react";
import { colors } from "../../theme";
import type { Candidate } from "../../types";

interface CandidateTabsProps {
  candidates: Candidate[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const CandidateTabs: React.FC<CandidateTabsProps> = ({
  candidates,
  activeId,
  onSelect,
}) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
    {candidates.map((c) => {
      const isActive = c.id === activeId;
      return (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          style={{
            background: isActive ? "rgba(88,166,255,.08)" : colors.surface2,
            border: `1px solid ${isActive ? colors.accent2 : colors.border}`,
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: ".74rem",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: isActive ? colors.accent2 : colors.text,
            transition: "all .15s",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {c.name}
          <span
            style={{
              fontSize: ".62rem",
              padding: "1px 6px",
              borderRadius: 10,
              background: isActive ? "rgba(88,166,255,.15)" : colors.surface3,
              color: isActive ? colors.accent2 : colors.muted,
            }}
          >
            {c.score}/100
          </span>
        </button>
      );
    })}
  </div>
);

export default CandidateTabs;
