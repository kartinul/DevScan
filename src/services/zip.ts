import JSZip from "jszip";

/**
 * Bundles an array of File objects into a single ZIP blob and triggers a download.
 */
export async function downloadFilesAsZip(files: File[], zipName: string = "accepted_resumes.zip"): Promise<void> {
  if (files.length === 0) return;

  const zip = new JSZip();

  // Add each file to the zip
  files.forEach((file) => {
    zip.file(file.name, file);
  });

  // Generate the zip blob
  const content = await zip.generateAsync({ type: "blob" });

  // Create a temporary link and trigger download
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = zipName;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
