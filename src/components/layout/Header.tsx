import React from "react";
import { colors, fonts } from "../../theme";

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 0 20px",
        borderBottom: `1px solid ${colors.border}`,
        marginBottom: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: "1.4rem",
          letterSpacing: "-.5px",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: colors.accent,
            borderRadius: 6,
            display: "grid",
            placeItems: "center",
            fontSize: "16px",
            color: colors.bg,
          }}
        >
          ⌬
        </div>
        <div>
          Dev<span style={{ color: colors.accent }}>Scan</span>
        </div>
      </div>
      <div
        style={{
          background: colors.surface2,
          border: `1px solid ${colors.border}`,
          color: colors.muted,
          fontSize: ".8rem",
          padding: "4px 12px",
          borderRadius: 20,
          fontWeight: 700,
        }}
      >
        :)
      </div>
    </header>
  );
};

export default Header;
