import { useState, useCallback, useMemo } from "react";
import type { UploadedFile, ScanState } from "./types";
import { GH_MOCK_USERS } from "./data";

// ─── File Upload Hook ────────────────────────────────────────────────────────
const detectGitHub = (fileIndex: number, delay: number): Promise<string> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(GH_MOCK_USERS[fileIndex % GH_MOCK_USERS.length]),
      delay,
    ),
  );

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
        }));
      return [...prev, ...newFiles];
    });

    incoming.forEach((f, offset) => {
      detectGitHub(offset, 900 + Math.random() * 700).then((username) => {
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
  "Parse resume & extract all claims",
  "Auto-detect GitHub from resume",
  "Fetch repos, commits & history",
  "Cross-reference every claim",
  "Generate credibility report",
];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function useScanFlow() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [scanState, setScanState] = useState<ScanState>({
    fileIndex: 0,
    currentFile: "",
    currentStep: 0,
    totalFiles: 0,
  });

  const runScan = useCallback(async (fileNames: string[]) => {
    setScanning(true);
    setDone(false);

    for (let fi = 0; fi < fileNames.length; fi++) {
      setScanState({
        fileIndex: fi,
        currentFile: fileNames[fi],
        currentStep: 0,
        totalFiles: fileNames.length,
      });

      for (let si = 0; si < SCAN_STEPS.length; si++) {
        setScanState((prev) => ({ ...prev, currentStep: si }));
        await wait(480 + Math.random() * 280);
      }
    }

    await wait(300);
    setScanning(false);
    setDone(true);
  }, []);

  return { scanning, scanState, done, runScan };
}
