import React, { useRef, useState } from "react";
import { colors } from "../../theme";

interface DropZoneProps {
  onFiles: (files: FileList) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFiles }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
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
        accept=".pdf,.doc,.docx"
        multiple
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>📂</div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          marginBottom: 6,
        }}
      >
        Drop resumes here
      </div>
      <div style={{ fontSize: ".74rem", color: colors.muted, lineHeight: 1.7 }}>
        <strong style={{ color: colors.accent }}>
          Multiple files supported
        </strong>{" "}
        · PDF, DOCX, DOC
        <br />
        GitHub username auto-detected from each resume
      </div>
    </div>
  );
};

export default DropZone;
