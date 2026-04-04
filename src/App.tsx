import React, { useState, useEffect, useRef } from "react";
import { colors } from "./theme";
import { AuditHeader } from "./components/AuditHeader";
import { AuditHero } from "./components/AuditHero";
import { FileUpload } from "./components/FileUpload";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { ResultsView } from "./components/ResultsView";
import { useFileUpload, useScanFlow } from "./hooks";
import { downloadFilesAsZip } from "./services/zip";
import type { Candidate } from "./types";

const App: React.FC = () => {
  const { files, addFiles, removeFile, editGH, readyFiles } = useFileUpload();
  const { scanning, scanState, done, runScan } = useScanFlow();
  const [results, setResults] = useState<Candidate[]>([]);
  const [activeId, setActiveId] = useState("");
  const [decisions, setDecisions] = useState<Record<string, 'accepted' | 'rejected'>>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScan = async () => {
    if (readyFiles.length === 0) return;
    const reportResults = await runScan(readyFiles);
    setResults(reportResults);
  };

  const handleDownload = () => {
    const acceptedFiles = results
      .filter(c => decisions[c.id] === 'accepted')
      .map(c => c.file)
      .filter((f): f is File => f !== undefined);
    
    if (acceptedFiles.length > 0) {
      downloadFilesAsZip(acceptedFiles);
    }
  };

  useEffect(() => {
    if (done && results.length > 0) {
      if (!activeId) {
        setActiveId(results[0].id);
      }
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [done, results, activeId]);

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh", position: "relative" }}>
      {/* Background Grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(57,211,83,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(57,211,83,.03) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "0 24px 100px" }}>
        <AuditHeader />
        
        {!done && (
          <>
            <AuditHero />
            <FileUpload files={files} onFiles={addFiles} onRemove={removeFile} onEditGH={editGH} />

            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button
                onClick={handleScan}
                disabled={readyFiles.length === 0}
                style={{
                  background: colors.accent,
                  color: colors.bg,
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 44px",
                  cursor: readyFiles.length > 0 ? "pointer" : "not-allowed",
                  transition: "all .2s",
                  opacity: readyFiles.length > 0 ? 1 : 0.35,
                  boxShadow: readyFiles.length > 0 ? `0 8px 24px rgba(57, 211, 83, 0.2)` : "none"
                }}
              >
                ⌬ &nbsp;Audit {readyFiles.length > 0 ? readyFiles.length : ""} Resumes
              </button>
            </div>
          </>
        )}

        {done && results.length > 0 && (
          <div ref={resultsRef}>
            <ResultsView 
              candidates={results} 
              activeId={activeId} 
              onSelect={setActiveId} 
              decisions={decisions}
              onDecide={(id, decision) => setDecisions(prev => ({...prev, [id]: decision}))}
              onDownload={handleDownload}
            />
          </div>
        )}
      </div>

      <LoadingOverlay active={scanning} {...scanState} />

      <style>
        {`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
          @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
          .spin { animation: spin 1s linear infinite; }
        `}
      </style>
    </div>
  );
};

export default App;
