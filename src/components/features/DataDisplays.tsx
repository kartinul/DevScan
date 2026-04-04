import React, { useState, useEffect } from "react";
import { colors } from "../../theme";
import type { Skill, Repo, Flag } from "../../types";
import type { Verdict } from "../../types";

// ─── Skill color helpers ──────────────────────────────────────────────────────
const skillColor = (verdict: Verdict): string =>
  ({
    verified: colors.accent,
    partial: colors.warn,
    inflated: colors.accent3,
    missing: colors.muted,
    bonus: colors.accent4,
  } as Record<Verdict, string>)[verdict] ?? colors.muted;

const skillLabel = (verdict: Verdict): string =>
  ({
    verified: "✓ verified",
    partial: "⚡ partial",
    inflated: "⚠ inflated",
    missing: "✗ missing",
    bonus: "★ bonus",
  } as Record<Verdict, string>)[verdict] ?? "";

// ─── SkillBar ────────────────────────────────────────────────────────────────
const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const color = skillColor(skill.verdict);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          fontSize: ".71rem",
          width: 88,
          flexShrink: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </div>
      <div
        style={{
          flex: 1,
          height: 5,
          background: colors.surface2,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: mounted ? `${skill.githubPct}%` : "0%",
            background: color,
            opacity: 0.85,
            borderRadius: 3,
            transition: "width 1s ease",
          }}
        />
      </div>
      <div
        style={{
          fontSize: ".64rem",
          width: 30,
          textAlign: "right",
          flexShrink: 0,
          color,
        }}
      >
        {skill.githubPct}%
      </div>
      <div
        style={{
          fontSize: ".58rem",
          width: 56,
          textAlign: "right",
          flexShrink: 0,
          color,
        }}
      >
        {skillLabel(skill.verdict)}
      </div>
    </div>
  );
};

// ─── SkillBars ────────────────────────────────────────────────────────────────
interface SkillBarsProps {
  skills: Skill[];
}

export const SkillBars: React.FC<SkillBarsProps> = ({ skills }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
    {skills.map((skill) => (
      <SkillBar key={skill.name} skill={skill} />
    ))}
  </div>
);

// ─── RepoList ─────────────────────────────────────────────────────────────────
interface RepoListProps {
  repos: Repo[];
}

export const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
    {repos.map((repo) => (
      <div
        key={repo.name}
        style={{
          background: colors.surface2,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: "11px 13px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: ".77rem",
              color: colors.accent2,
              marginBottom: 3,
            }}
          >
            {repo.name}
          </div>
          <div style={{ fontSize: ".63rem", color: colors.muted }}>
            {repo.lang} · ★{repo.stars} · {repo.months}mo active
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {repo.claimMatches.length > 0 ? (
            repo.claimMatches.map((m) => (
              <div
                key={m}
                style={{
                  fontSize: ".58rem",
                  padding: "2px 7px",
                  borderRadius: 10,
                  background: colors.surface3,
                  border: `1px solid rgba(57,211,83,.3)`,
                  color: colors.accent,
                }}
              >
                {m}
              </div>
            ))
          ) : (
            <div
              style={{
                fontSize: ".58rem",
                padding: "2px 7px",
                borderRadius: 10,
                background: colors.surface3,
                border: `1px solid ${colors.border}`,
                color: colors.muted,
              }}
            >
              no claim match
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

// ─── FlagList ─────────────────────────────────────────────────────────────────
interface FlagListProps {
  flags: Flag[];
}

const FLAG_BORDER: Record<Flag["type"], string> = {
  red: colors.accent3,
  green: colors.accent,
  warn: colors.warn,
};
const FLAG_ICON: Record<Flag["type"], string> = {
  red: "🚩",
  green: "✅",
  warn: "⚠️",
};

export const FlagList: React.FC<FlagListProps> = ({ flags }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {flags.map((flag, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          background: colors.surface2,
          borderRadius: 8,
          padding: "11px 13px",
          borderLeft: `3px solid ${FLAG_BORDER[flag.type]}`,
          fontSize: ".73rem",
          lineHeight: 1.5,
        }}
      >
        <span style={{ fontSize: ".9rem", flexShrink: 0, marginTop: 1 }}>
          {FLAG_ICON[flag.type]}
        </span>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>{flag.title}</div>
          <div
            style={{ fontSize: ".66rem", color: colors.muted, lineHeight: 1.6 }}
          >
            {flag.desc}
          </div>
        </div>
      </div>
    ))}
  </div>
);
