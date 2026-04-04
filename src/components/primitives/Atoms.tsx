import React from "react";
import { colors } from "../../theme";

// ─── ConfidenceDots ──────────────────────────────────────────────────────────
interface ConfidenceDotsProps {
  value: number;
  max?: number;
}

export const ConfidenceDots: React.FC<ConfidenceDotsProps> = ({
  value,
  max = 5,
}) => {
  const dotColor =
    value >= 4 ? colors.accent : value >= 2 ? colors.warn : colors.accent3;
  return (
    <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i < value ? dotColor : colors.surface2,
            transition: "background .3s",
          }}
        />
      ))}
    </div>
  );
};

// ─── ProgressBar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color,
  style,
}) => (
  <div
    style={{
      height: 5,
      background: colors.surface2,
      borderRadius: 3,
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${value}%`,
        background:
          color ??
          `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`,
        borderRadius: 3,
        transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
      }}
    />
  </div>
);

// ─── SectionLabel ─────────────────────────────────────────────────────────────
interface SectionLabelProps {
  children: React.ReactNode;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => (
  <div
    style={{
      fontSize: ".63rem",
      textTransform: "uppercase",
      letterSpacing: ".1em",
      color: colors.muted,
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    {children}
    <div style={{ flex: 1, height: 1, background: colors.border }} />
  </div>
);

// ─── SectionTitle ─────────────────────────────────────────────────────────────
interface SectionTitleProps {
  children: React.ReactNode;
  count?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  count,
}) => (
  <div
    style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: "1rem",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    {children}
    {count != null && (
      <span
        style={{
          fontSize: ".68rem",
          background: colors.surface2,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: "1px 8px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
          color: colors.muted,
        }}
      >
        {count}
      </span>
    )}
  </div>
);

// ─── CategoryPill ─────────────────────────────────────────────────────────────
interface CategoryPillProps {
  children: React.ReactNode;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ children }) => (
  <div
    style={{
      fontSize: ".58rem",
      background: colors.surface2,
      border: `1px solid ${colors.border}`,
      borderRadius: 3,
      padding: "1px 6px",
      color: colors.muted,
      marginBottom: 5,
      display: "inline-block",
    }}
  >
    {children}
  </div>
);
