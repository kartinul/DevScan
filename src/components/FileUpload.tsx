import React, { useRef, useState } from "react";
import { colors, fonts } from "../theme";
import type { UploadedFile } from "../types";
import { X, FileText, CheckCircle, Search, Edit3 } from "lucide-react";

interface FileUploadProps {
  files: UploadedFile[];
  onFiles: (files: FileList) => void;
  onRemove: (id: number) => void;
  onEditGH: (id: number, username: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ files, onFiles, onRemove, onEditGH }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  };

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: 28,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          fontSize: ".65rem",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: colors.muted,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        Resumes — drop multiple files
        <div style={{ flex: 1, height: 1, background: colors.border }} />
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `1.5px dashed ${dragging ? colors.accent : colors.border2}`,
          borderRadius: 10,
          padding: "42px 20px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(57,211,83,.04)" : "transparent",
          transition: "border-color .2s, background .2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => { if (e.target.files?.length) onFiles(e.target.files); e.target.value = ""; }}
          style={{ display: "none" }}
        />
        <div style={{ fontSize: "2rem", marginBottom: 12, color: colors.muted }}>📂</div>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: "1rem", marginBottom: 6 }}>
          Drop resumes here
        </div>
        <div style={{ fontSize: ".74rem", color: colors.muted }}>
          <strong style={{ color: colors.accent }}>PDF only</strong>
        </div>
      </div>

      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {files.map((file) => (
            <FileItem key={file.id} file={file} onRemove={() => onRemove(file.id)} onEditGH={(val) => onEditGH(file.id, val)} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileItem: React.FC<{ file: UploadedFile, onRemove: () => void, onEditGH: (val: string) => void }> = ({ file, onRemove, onEditGH }) => {
  const [editing, setEditing] = useState(false);
  const [ghVal, setGhVal] = useState(file.github ?? "");

  return (
    <div
      style={{
        background: colors.surface2,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        padding: "12px 15px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 12,
        alignItems: "center",
      }}
    >
      <div style={{ color: colors.accent2 }}><FileText size={18} /></div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: ".79rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file.name}
          </span>
          {file.github && !editing && (
            <span style={{ fontSize: ".62rem", color: colors.accent, background: "rgba(57,211,83,.1)", padding: "1px 6px", borderRadius: 4 }}>
              @{file.github}
            </span>
          )}
        </div>
        <div style={{ fontSize: ".66rem", color: colors.muted, display: "flex", alignItems: "center", gap: 10 }}>
          {file.detecting ? (
            <span style={{ color: colors.warn, display: "flex", alignItems: "center", gap: 4 }}>
              <Search size={10} className="spin" /> Detecting...
            </span>
          ) : (
            <span style={{ color: colors.accent, display: "flex", alignItems: "center", gap: 4 }}>
              <CheckCircle size={10} /> Ready
            </span>
          )}
          
          {editing ? (
            <input
              autoFocus
              value={ghVal}
              onChange={(e) => setGhVal(e.target.value)}
              onBlur={() => { onEditGH(ghVal); setEditing(false); }}
              onKeyDown={(e) => e.key === "Enter" && (onEditGH(ghVal), setEditing(false))}
              style={{ background: colors.surface3, border: `1px solid ${colors.accent2}`, borderRadius: 4, color: colors.text, fontSize: ".7rem", padding: "1px 6px", outline: "none" }}
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={{ background: "none", border: "none", color: colors.muted, fontSize: ".65rem", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
            >
              <Edit3 size={10} /> edit github
            </button>
          )}
        </div>
      </div>
      <button onClick={onRemove} style={{ background: "none", border: "none", color: colors.muted, cursor: "pointer" }}>
        <X size={16} />
      </button>
    </div>
  );
};
