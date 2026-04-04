import React, { useEffect, useState } from "react";
import { Candidate } from "../../types";
import { SectionTitle } from "../primitives/Atoms";
import { Card } from "../primitives/Card";
import ScoreBar from "./ScoreBar";
import ClaimsTable from "./ClaimsTable";
import AISummary from "./AISummary";
import { SkillBars, RepoList, FlagList } from "./DataDisplays";
import ActivityHeatmap from "./ActivityHeatmap";

interface CandidatePanelProps {
  candidate: Candidate;
  isActive: boolean;
}

const CandidatePanel: React.FC<CandidatePanelProps> = ({
  candidate,
  isActive,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Small delay to trigger entry animations
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      style={{
        display: "block",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(12px)",
        transition: "opacity .5s ease, transform .5s ease",
      }}
    >
      {/* ─── Top Score Card ─── */}
      <ScoreBar candidate={candidate} />

      {/* ─── Claims Audit Section ─── */}
      <div style={{ marginBottom: 32 }}>
        <SectionTitle count={`${candidate.claims.length} claims extracted`}>
          Claims Audit
        </SectionTitle>
        <ClaimsTable claims={candidate.claims} />
      </div>

      {/* ─── AI Summary Box ─── */}
      <div
        style={{
          marginBottom: 24,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(12px)",
          transition: "opacity .5s .2s, transform .5s .2s",
        }}
      >
        <AISummary summary={candidate.summary} />
      </div>

      {/* ─── Lower Grid ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <Card
          label="📊 Skill Claim vs Evidence"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(12px)",
            transition: "opacity .5s .3s, transform .5s .3s",
          }}
        >
          <SkillBars skills={candidate.skills} />
        </Card>

        <Card
          label="📦 Top Repos · Claim Matches"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(12px)",
            transition: "opacity .5s .4s, transform .5s .4s",
          }}
        >
          <RepoList repos={candidate.repos} />
        </Card>

        <Card
          label="📅 Contribution Activity"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(12px)",
            transition: "opacity .5s .5s, transform .5s .5s",
          }}
        >
          <ActivityHeatmap stats={candidate.stats} />
        </Card>

        <Card
          label="🚩 Flags & Standouts"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(12px)",
            transition: "opacity .5s .6s, transform .5s .6s",
          }}
        >
          <FlagList flags={candidate.flags} />
        </Card>
      </div>

      {/* Responsive adjustments for mobile would usually go in CSS, 
          but we can use a simple media query hack or just keep it 
          as a grid that wraps. auto-fit minmax 480px handles basic wrapping. */}
    </div>
  );
};

export default CandidatePanel;
