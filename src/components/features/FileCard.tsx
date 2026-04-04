import React, { useState } from "react";
import { colors } from "../../theme";
import type { UploadedFile } from "../../types";

interface FileCardProps {
  file: UploadedFile;
  onRemove: () => void;
  onEditGH: (username: string) => void;
}

const GitHubIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const FileCard: React.FC<FileCardProps> = ({
  file,
  onRemove,
  onEditGH,
}) => {
  const [editing, setEditing] = useState(false);
  const [ghVal, setGhVal] = useState(file.github ?? "");

  const ext = file.name.split(".").pop()?.toUpperCase() ?? "DOC";
  const kb = file.size ? (file.size / 1024).toFixed(0) : "?";

  const commitEdit = () => {
    onEditGH(ghVal.trim());
    setEditing(false);
  };

  return (
    <div
      style={{
        background: colors.surface2,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        padding: "13px 15px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 12,
        alignItems: "center",
        animation: "slideIn .25s ease",
      }}
    >
      {/* Extension badge */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 6,
          background: colors.surface3,
          border: `1px solid ${colors.border}`,
          display: "grid",
          placeItems: "center",
          fontSize: ".61rem",
          fontWeight: 700,
          color: colors.accent2,
          flexShrink: 0,
        }}
      >
        {ext}
      </div>

      {/* File info */}
      <div style={{ minWidth: 0 }}>
        {/* Name row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: ".79rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 220,
            }}
          >
            {file.name}
          </span>
          {file.github && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(57,211,83,.1)",
                border: "1px solid rgba(57,211,83,.25)",
                borderRadius: 4,
                padding: "1px 7px",
                fontSize: ".62rem",
                color: colors.accent,
                animation: "fadeIn .4s ease",
              }}
            >
              <GitHubIcon />
              {file.github}
            </span>
          )}
        </div>

        {/* Meta row */}
        <div
          style={{
            fontSize: ".66rem",
            color: colors.muted,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {file.detecting ? (
            <span
              style={{
                color: colors.warn,
                animation: "blinkOp 1.2s ease infinite",
              }}
            >
              ● Detecting GitHub…
            </span>
          ) : (
            <span style={{ color: colors.accent }}>✓ Ready</span>
          )}
          <span>{kb} KB</span>

          {!file.detecting &&
            (editing ? (
              <input
                autoFocus
                value={ghVal}
                onChange={(e) => setGhVal(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                placeholder="github username"
                style={{
                  background: colors.surface3,
                  border: `1px solid ${colors.accent2}`,
                  borderRadius: 4,
                  color: colors.text,
                  fontSize: ".73rem",
                  padding: "3px 8px",
                  outline: "none",
                  width: 130,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
            ) : (
              <button
                onClick={() => {
                  setGhVal(file.github ?? "");
                  setEditing(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.muted,
                  fontSize: ".65rem",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.accent2)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.muted)
                }
              >
                ✎ edit github
              </button>
            ))}
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          color: colors.muted,
          fontSize: "1rem",
          padding: "2px 4px",
          lineHeight: 1,
          cursor: "pointer",
          flexShrink: 0,
          transition: "color .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent3)}
        onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
        aria-label="Remove file"
      >
        ✕
      </button>
    </div>
  );
};

export default FileCard;
