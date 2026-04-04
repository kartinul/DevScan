import { createWorker } from "tesseract.js";

/**
 * OCR: Extract text from PDF/Image resume.
 * Returns empty string if error occurs.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  try {
    const worker = await createWorker("eng");
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();
    return text;
  } catch (error) {
    console.warn("OCR Error, returning empty string:", error);
    return "";
  }
}
