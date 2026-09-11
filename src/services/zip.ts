import JSZip from "jszip";

export async function downloadFilesAsZip(files: File[], zipName: string = "accepted_resumes.zip"): Promise<void> {
  if (files.length === 0) return;

  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file);
  });

  const content = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = zipName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
