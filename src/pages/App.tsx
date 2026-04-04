import React, { useState, useEffect, useRef } from "react";
import { colors } from "../theme";
import { Header, Hero } from "../components/layout";
import {
  DropZone,
  FileCard,
  LoadingOverlay,
  CandidateTabs,
  CandidatePanel,
} from "../components/features";
import { useFileUpload } from "../hooks/useFileUpload";
import { useScanFlow } from "../hooks/useScanFlow";
import { MOCK_CANDIDATES } from "../data/mockCandidates";

const App: React.FC = () => {
  const { files, addFiles, removeFile, editGH, readyFiles } = useFileUpload();
  const { scanning, scanState, done, runScan } = useScanFlow();
  const [activeId, setActiveId] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScan = async () => {
    if (readyFiles.length === 0) return;
    const names = readyFiles.map((f) => f.name);
    await runScan(names);
  };

  // Cycle through MOCK_CANDIDATES based on the number of files uploaded
  const results = readyFiles.map((f, i) => {
    const mock = MOCK_CANDIDATES[i % MOCK_CANDIDATES.length];
    return {
      ...mock,
      id: `${mock.id}-${f.id}`,
      // Improve name generation logic
      name: f.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").toUpperCase(),
      filename: f.name,
      github: f.github || mock.github,
    };
  });

  useEffect(() => {
    if (done) {
      if (results.length > 0) setActiveId(results[0].id);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [done]);

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* ─── Grid Background ─── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(57,211,83,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(57,211,83,.03) 1px,transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px 100px",
        }}
      >
        <Header />
        
        {!done && (
          <>
            <Hero />

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
                Resumes — drop multiple files at once
                <div style={{ flex: 1, height: 1, background: colors.border }} />
              </div>

              <DropZone onFiles={addFiles} />

              {files.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 18,
                  }}
                >
                  {files.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onRemove={() => removeFile(file.id)}
                      onEditGH={(username) => editGH(file.id, username)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div style={{ textAlign: "center", margin: "28px 0 56px" }}>
              <button
                onClick={handleScan}
                disabled={readyFiles.length === 0}
                className="scan-btn"
                style={{
                  background: colors.accent,
                  color: colors.bg,
                  border: "none",
                  borderRadius: 8,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 44px",
                  cursor: readyFiles.length > 0 ? "pointer" : "not-allowed",
                  letterSpacing: ".02em",
                  transition: "all .2s",
                  opacity: readyFiles.length > 0 ? 1 : 0.35,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                ⌬ &nbsp;Audit All Resumes
              </button>
              {readyFiles.length > 0 && (
                <div
                  style={{
                    fontSize: ".72rem",
                    color: colors.muted,
                    marginTop: 10,
                  }}
                >
                  {readyFiles.length} resume{readyFiles.length > 1 ? "s" : ""} ready · GitHub auto-detected
                </div>
              )}
            </div>
          </>
        )}

        {done && (
          <div ref={resultsRef} style={{ animation: "fadeIn .6s ease" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.accent,
                    boxShadow: `0 0 8px ${colors.accent}`,
                    animation: "pulse 2s infinite",
                  }}
                />
                Claims Audit Report
              </div>
              <div style={{ fontSize: ".7rem", color: colors.muted }}>
                {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}
              </div>
            </div>

            <CandidateTabs
              candidates={results}
              activeId={activeId}
              onSelect={setActiveId}
            />

            {results.map((c) => (
              <CandidatePanel
                key={c.id}
                candidate={c}
                isActive={c.id === activeId}
              />
            ))}
            
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "transparent",
                  border: `1px solid ${colors.border}`,
                  color: colors.muted,
                  padding: "8px 20px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: ".75rem",
                }}
              >
                Start New Audit
              </button>
            </div>
          </div>
        )}
      </div>

      <LoadingOverlay
        visible={scanning}
        currentFile={scanState.currentFile}
        fileIndex={scanState.fileIndex}
        totalFiles={scanState.totalFiles}
        currentStep={scanState.currentStep}
      />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes blinkOp {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .scan-btn:not(:disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(57, 211, 83, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default App;
