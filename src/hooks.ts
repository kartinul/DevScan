import { useState, useCallback, useMemo } from "react";
import type { UploadedFile, ScanState, Candidate } from "./types";
import { detectGitHubUser } from "./services/github";
import { performFullAudit } from "./services/audit";

// ─── File Upload Hook ────────────────────────────────────────────────────────
export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);

    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      const newFiles: UploadedFile[] = incoming
        .filter((f) => !existing.has(f.name))
        .map((f, offset) => ({
          id: Date.now() + offset,
          name: f.name,
          size: f.size,
          github: null,
          detecting: true,
          file: f,
        }));
      return [...prev, ...newFiles];
    });

    incoming.forEach((f, offset) => {
      detectGitHubUser(f, offset).then((username) => {
        setFiles((prev) =>
          prev.map((item) =>
            item.name === f.name && item.detecting
              ? { ...item, detecting: false, github: username }
              : item,
          ),
        );
      });
    });
  }, []);

  const removeFile = (id: number) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const editGH = (id: number, username: string) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, github: username } : f)));

  const readyFiles = useMemo(() => files.filter((f) => !f.detecting), [files]);

  return { files, addFiles, removeFile, editGH, readyFiles };
}

// ─── Scan Flow Hook ──────────────────────────────────────────────────────────
export const SCAN_STEPS = [
  "OCR: Extracting resume text",
  "Analyzing resume structure",
  "GraphQL: Fetching GitHub evidence",
  "AI: Cross-referencing claims",
  "Generating audit report",
];

export function useScanFlow() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [scanState, setScanState] = useState<ScanState>({
    fileIndex: 0,
    currentFile: "",
    currentStep: 0,
    totalFiles: 0,
  });

  const runScan = useCallback(async (uploadedFiles: UploadedFile[]): Promise<Candidate[]> => {
    setScanning(true);
    setDone(false);
    const results: Candidate[] = [];

    for (let fi = 0; fi < uploadedFiles.length; fi++) {
      const uFile = uploadedFiles[fi];
      setScanState({
        fileIndex: fi,
        currentFile: uFile.name,
        currentStep: 0,
        totalFiles: uploadedFiles.length,
      });

      const auditResult = await performFullAudit(
        uFile.file, 
        uFile.github || "unknown", 
        fi, 
        (stepIndex) => setScanState((prev) => ({ ...prev, currentStep: stepIndex }))
      );
      
      results.push(auditResult);
    }

    setScanning(false);
    setDone(true);
    return results;
  }, []);

  return { scanning, scanState, done, runScan };
}
