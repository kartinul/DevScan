import { useState, useCallback, useMemo } from "react";
import type { UploadedFile } from "../types";
import { GH_MOCK_USERS } from "../data/mockCandidates";

// Simulates the async GitHub username detection from a resume file.
// In production this would call your backend parser.
const detectGitHub = (fileIndex: number, delay: number): Promise<string> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(GH_MOCK_USERS[fileIndex % GH_MOCK_USERS.length]),
      delay,
    ),
  );

interface UseFileUploadReturn {
  files: UploadedFile[];
  addFiles: (fileList: FileList | null) => void;
  removeFile: (id: number) => void;
  editGH: (id: number, username: string) => void;
  readyFiles: UploadedFile[];
}

export function useFileUpload(): UseFileUploadReturn {
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

    // Kick off async detection for each file independently
    incoming.forEach((f, offset) => {
      const delay = 900 + Math.random() * 700;
      detectGitHub(offset, delay).then((username) => {
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

  const removeFile = useCallback((id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const editGH = useCallback((id: number, username: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, github: username } : f)),
    );
  }, []);

  const readyFiles = useMemo(() => files.filter((f) => !f.detecting), [files]);

  return { files, addFiles, removeFile, editGH, readyFiles };
}
