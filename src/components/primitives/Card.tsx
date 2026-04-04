import React, { useState, useEffect } from "react";
import { colors } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  delay?: number; // ms before the reveal animation triggers
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, delay = 0, style }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(12px)",
        transition: "opacity .45s ease, transform .45s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  label: React.ReactNode;
  right?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ label, right }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    }}
  >
    <div
      style={{
        fontSize: ".62rem",
        textTransform: "uppercase",
        letterSpacing: ".1em",
        color: colors.muted,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {label}
    </div>
    {right}
  </div>
);
