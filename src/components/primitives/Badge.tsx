import React from "react";
import { colors } from "../../theme";

interface BadgeProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ children, style }) => (
  <span
    style={{
      background: colors.surface2,
      border: `1px solid ${colors.border}`,
      color: colors.muted,
      fontSize: ".7rem",
      padding: "4px 10px",
      borderRadius: 20,
      letterSpacing: ".05em",
      ...style,
    }}
  >
    {children}
  </span>
);
