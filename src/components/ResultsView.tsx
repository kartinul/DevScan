import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Progress from "@radix-ui/react-progress";
import { colors, fonts } from "../theme";
import type { Candidate, Claim, Skill, Repo, Flag, SummaryPart } from "../types";
import { AlertCircle, CheckCircle2, Info, Star, Calendar, GitCommit } from "lucide-react";

interface ResultsViewProps {
  candidates: Candidate[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ candidates, activeId, onSelect }) => {
  return (
    <div style={{ animation: "fadeIn .6s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.accent, boxShadow: `0 0 8px ${colors.accent}`, animation: "pulse 2s infinite" }} />
          Audit Report
        </div>
        <div style={{ fontSize: ".7rem", color: colors.muted }}>
          {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}
        </div>
      </div>

      <Tabs.Root value={activeId} onValueChange={onSelect}>
        <Tabs.List style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {candidates.map((c) => (
            <Tabs.Trigger
              key={c.id}
              value={c.id}
              style={{
                background: activeId === c.id ? "rgba(88,166,255,.08)" : colors.surface2,
                border: `1px solid ${activeId === c.id ? colors.accent2 : colors.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: ".74rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: activeId === c.id ? colors.accent2 : colors.text,
                transition: "all .15s",
                cursor: "pointer",
                fontFamily: fonts.mono,
              }}
            >
              {c.name}
              <span style={{ fontSize: ".62rem", padding: "1px 6px", borderRadius: 10, background: activeId === c.id ? "rgba(88,166,255,.15)" : colors.surface3, color: activeId === c.id ? colors.accent2 : colors.muted }}>
                {c.score}/100
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {candidates.map((c) => (
          <Tabs.Content key={c.id} value={c.id} style={{ animation: "slideIn .4s ease", outline: "none" }}>
            <CandidateDashboard candidate={c} />
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button
          onClick={() => window.location.reload()}
          style={{ background: "transparent", border: `1px solid ${colors.border}`, color: colors.muted, padding: "8px 20px", borderRadius: 6, cursor: "pointer", fontSize: ".75rem" }}
        >
          Start New Audit
        </button>
      </div>
    </div>
  );
};

const CandidateDashboard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
  <div>
    {/* Score Header */}
    <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".1em", color: colors.muted, marginBottom: 4 }}>Credibility Score</div>
          <div style={{ fontFamily: fonts.display, fontSize: "2.4rem", fontWeight: 800, color: colors.accent, lineHeight: 1 }}>{candidate.score}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".1em", color: colors.muted, marginBottom: 4 }}>Verdict</div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: colors.text }}>{candidate.verdict}</div>
        </div>
      </div>
      <Progress.Root value={candidate.score} style={{ background: colors.surface2, borderRadius: 10, height: 8, overflow: "hidden" }}>
        <Progress.Indicator style={{ background: colors.accent, width: "100%", height: "100%", transition: "transform 1s ease", transform: `translateX(-${100 - candidate.score}%)` }} />
      </Progress.Root>
      <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".75rem", color: colors.muted }}><GitCommit size={14} /> {candidate.stats.commits} Commits</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".75rem", color: colors.muted }}><Star size={14} /> {candidate.stats.stars} Stars</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".75rem", color: colors.muted }}><Calendar size={14} /> {candidate.stats.activeMo}mo Active</div>
      </div>
    </div>

    {/* AI Summary */}
    <div style={{ marginBottom: 32, lineHeight: 1.8, fontSize: ".85rem", color: colors.muted }}>
      {candidate.summary.map((part, i) => (
        <span key={i} style={{ 
          color: part.type === "bold" ? colors.text : 
                 part.type === "green" ? colors.accent : 
                 part.type === "red" ? colors.accent3 : 
                 part.type === "warn" ? colors.warn : "inherit",
          fontWeight: part.type === "bold" ? 700 : "inherit",
          display: part.type === "break" ? "block" : "inline",
          marginBottom: part.type === "break" ? 12 : 0
        }}>
          {part.content}
        </span>
      ))}
    </div>

    {/* Claims Audit */}
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".1em", color: colors.muted, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        Claims Audit ({candidate.claims.length})
        <div style={{ flex: 1, height: 1, background: colors.border }} />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {candidate.claims.map((claim, i) => (
          <div key={i} style={{ background: colors.surface2, border: `1px solid ${colors.border}`, borderRadius: 10, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: ".6rem", background: colors.surface3, padding: "2px 6px", borderRadius: 4, color: colors.muted }}>{claim.category}</span>
              <VerdictBadge verdict={claim.verdict} />
            </div>
            <div style={{ fontSize: ".85rem", fontWeight: 600, marginBottom: 4 }}>{claim.text}</div>
            <div style={{ fontSize: ".7rem", fontStyle: "italic", color: colors.muted, marginBottom: 12 }}>"{claim.quote}"</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {claim.evidence.map((ev, ei) => (
                <span key={ei} style={{ fontSize: ".65rem", color: colors.accent2, background: "rgba(88,166,255,.05)", padding: "1px 6px", borderRadius: 4 }}>→ {ev}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Grid for Skills & Flags */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24, marginBottom: 48 }}>
      <div>
        <div style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".1em", color: colors.muted, marginBottom: 16 }}>Skills & Evidence</div>
        <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {candidate.skills.map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", marginBottom: 6 }}>
                <span>{s.name}</span>
                <span style={{ color: colors.accent }}>{s.githubPct}% evidence</span>
              </div>
              <Progress.Root value={s.githubPct} style={{ background: colors.surface2, borderRadius: 10, height: 4, overflow: "hidden" }}>
                <Progress.Indicator style={{ background: colors.accent, width: "100%", height: "100%", transform: `translateX(-${100 - s.githubPct}%)` }} />
              </Progress.Root>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".1em", color: colors.muted, marginBottom: 16 }}>Findings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {candidate.flags.map((f, i) => (
            <div key={i} style={{ background: colors.surface2, borderLeft: `3px solid ${f.type === 'red' ? colors.accent3 : f.type === 'green' ? colors.accent : colors.warn}`, padding: 12, borderRadius: "0 8px 8px 0" }}>
              <div style={{ fontSize: ".75rem", fontWeight: 700, marginBottom: 2 }}>{f.title}</div>
              <div style={{ fontSize: ".7rem", color: colors.muted }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Mock Data Indicator */}
    {candidate.mock && (
      <div style={{ 
        marginTop: 32, 
        padding: "8px 12px", 
        border: `1px solid ${colors.border}`, 
        borderRadius: 6, 
        fontSize: ".65rem", 
        color: colors.muted,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,255,255,.02)",
        width: "fit-content"
      }}>
        <Info size={12} />
        This report is based on demo data (Mock GitHub/AI response)
      </div>
    )}
  </div>
);

const VerdictBadge: React.FC<{ verdict: string }> = ({ verdict }) => {
  const styles: any = {
    verified: { color: colors.accent, icon: <CheckCircle2 size={12} /> },
    partial: { color: colors.warn, icon: <Info size={12} /> },
    inflated: { color: colors.accent3, icon: <AlertCircle size={12} /> },
    missing: { color: colors.muted, icon: <AlertCircle size={12} /> },
    bonus: { color: colors.accent4, icon: <Star size={12} /> },
  };
  const s = styles[verdict] || styles.missing;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: ".65rem", fontWeight: 700, color: s.color, textTransform: "capitalize" }}>
      {s.icon} {verdict}
    </div>
  );
};
