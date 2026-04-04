import React from "react";
import { colors } from "../../theme";
import type { Claim } from "../../types";
import { VerdictChip } from "../primitives/VerdictChip";
import { ConfidenceDots, CategoryPill } from "../primitives/Atoms";

// ─── Single row ──────────────────────────────────────────────────────────────
interface ClaimRowProps {
  claim: Claim;
  index: number;
}

const ClaimRow: React.FC<ClaimRowProps> = ({ claim, index }) => {
  const rowBg = index % 2 !== 0 ? "rgba(255,255,255,.008)" : "transparent";
  const tdStyle: React.CSSProperties = {
    padding: "12px 12px",
    borderBottom: `1px solid rgba(33,38,45,.5)`,
    verticalAlign: "top",
    background: rowBg,
  };

  return (
    <tr>
      {/* Claim */}
      <td style={tdStyle}>
        <CategoryPill>{claim.category}</CategoryPill>
        <div style={{ fontSize: ".76rem", lineHeight: 1.5, marginBottom: 3 }}>
          {claim.text}
        </div>
        <div
          style={{
            fontSize: ".65rem",
            color: colors.muted,
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {claim.quote}
        </div>
      </td>

      {/* Evidence */}
      <td style={tdStyle}>
        {claim.evidence.length > 0 ? (
          claim.evidence.map((ev, i) => (
            <div
              key={i}
              style={{
                fontSize: ".7rem",
                display: "flex",
                gap: 5,
                marginBottom: 4,
                lineHeight: 1.5,
                color: colors.muted,
              }}
            >
              <span style={{ color: colors.accent2, flexShrink: 0 }}>→</span>
              <span>{ev}</span>
            </div>
          ))
        ) : (
          <div style={{ fontSize: ".7rem", color: colors.muted }}>
            — No matching repos or commits found
          </div>
        )}
      </td>

      {/* Confidence */}
      <td style={{ ...tdStyle, textAlign: "center", verticalAlign: "middle" }}>
        <ConfidenceDots value={claim.confidence} />
      </td>

      {/* Verdict */}
      <td style={{ ...tdStyle, verticalAlign: "middle" }}>
        <VerdictChip verdict={claim.verdict} />
      </td>
    </tr>
  );
};

// ─── Table ───────────────────────────────────────────────────────────────────
interface ClaimsTableProps {
  claims: Claim[];
}

const COLUMNS = [
  { label: "Claim (from resume)", width: "30%" },
  { label: "GitHub Evidence", width: "38%" },
  { label: "Confidence", width: "12%", center: true },
  { label: "Verdict", width: "20%" },
];

export const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims }) => (
  <div style={{ overflowX: "auto", marginBottom: 24 }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
      <thead>
        <tr>
          {COLUMNS.map((col) => (
            <th
              key={col.label}
              style={{
                fontSize: ".6rem",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: colors.muted,
                padding: "8px 12px",
                textAlign: col.center ? "center" : "left",
                borderBottom: `1px solid ${colors.border}`,
                fontWeight: 400,
                width: col.width,
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {claims.map((claim, i) => (
          <ClaimRow key={i} claim={claim} index={i} />
        ))}
      </tbody>
    </table>
  </div>
);

export default ClaimsTable;
