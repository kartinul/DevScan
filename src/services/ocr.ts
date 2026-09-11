if (typeof ReadableStream !== "undefined" && !(ReadableStream.prototype as any)[Symbol.asyncIterator]) {
  (ReadableStream.prototype as any)[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  };
}

import * as pdfjs from 'pdfjs-dist';

import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export async function extractTextFromFile(file: File): Promise<string> {
  console.log(`[Parser] Processing PDF: ${file.name}`);

  if (file.type !== "application/pdf") {
    throw new Error(`[Parser] Unsupported file type: ${file.type}. Only PDF files are supported.`);
  }

  try {
    const arrayBuffer = await file.arrayBuffer();

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
