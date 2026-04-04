import React from "react";
import { colors, fonts } from "../../theme";

const Hero: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <h1
        style={{
          fontFamily: fonts.display,
          fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-1px",
          marginBottom: 14,
        }}
      >
        What you <em style={{ color: colors.accent, fontStyle: "normal" }}>claim</em>.
        <br />
        What GitHub <em style={{ color: colors.accent, fontStyle: "normal" }}>proves</em>.
      </h1>
      <p
        style={{
          color: colors.muted,
          fontSize: ".82rem",
          lineHeight: 1.8,
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        Drop one or many resumes. DevScan auto-detects each candidate's GitHub from
        their resume, then audits every claim — skills, years of experience,
        projects, scale — against real commit evidence.
      </p>
    </div>
  );
};

export default Hero;
