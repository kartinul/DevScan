import { useState, useCallback } from "react";
import type { ScanState } from "../types";

export const SCAN_STEPS = [
  "Parse resume & extract all claims",
  "Auto-detect GitHub from resume",
  "Fetch repos, commits & history",
  "Cross-reference every claim",
  "Generate credibility report",
];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

interface UseScanFlowReturn {
  scanning: boolean;
  scanState: ScanState;
  done: boolean;
  runScan: (fileNames: string[]) => Promise<void>;
}

export function useScanFlow(): UseScanFlowReturn {
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

      if (fi < fileNames.length - 1) await wait(200);
    }

    await wait(300);
    setScanning(false);
    setDone(true);
  }, []);

  return { scanning, scanState, done, runScan };
}
