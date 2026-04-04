import * as pdfjs from 'pdfjs-dist';

// This tells Vite to bundle the worker and give us the URL
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

/**
 * Configure PDF.js Worker
 * We use the local bundled worker instead of a CDN to avoid 404s and version mismatches.
 */
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * OCR/Parser: Extract text from PDF resume using pdf.js.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  console.log(`[Parser] Processing PDF: ${file.name}`);

  if (file.type !== "application/pdf") {
    console.error("[Parser] Only PDF files are supported.");
    return "";
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // We use the modern API for pdfjs v5.x
    const loadingTask = pdfjs.getDocument({ 
      data: arrayBuffer,
      useWorkerFetch: true,
      isEvalSupported: false,
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // textContent.items can contain either TextItem or TextMarkedContent
      // We filter for items that have the 'str' property
      const pageText = textContent.items
        .map((item: any) => item.str || "")
        .join(" ");
        
      fullText += pageText + "\n";
      console.log(`[Parser] Parsed page ${i}/${pdf.numPages}`);
    }

    console.log("[Parser] PDF extraction complete. Length:", fullText.length);
    return fullText;
  } catch (error) {
    console.error("[Parser] Critical Error during PDF extraction:", error);
    return "";
  }
}
