// Automated PDF Certificate Renderer for missing preview images
const pdfModules = import.meta.glob("../assets/certificate-previews/Webinars/*.pdf", {
  eager: true,
  import: "default"
});

function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateMissingPdfPreviews() {
  if (typeof window === "undefined") return;

  // Check if PDF.js is loaded
  if (!window.pdfjsLib) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  for (const [path, url] of Object.entries(pdfModules)) {
    const rawFileName = path.split("/").pop().replace(/\.pdf$/i, "");
    const slug = sanitizeName(rawFileName);
    const targetFileName = `${slug}.jpg`;

    try {
      const loadingTask = window.pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = Math.min(1920 / unscaledViewport.width, 2.5);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");

      await page.render({ canvasContext: ctx, viewport }).promise;

      const base64 = canvas.toDataURL("image/jpeg", 0.9);

      await fetch("/api/save-webp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: targetFileName, base64 })
      });
      console.log(`[PDF Preview Generated] ${targetFileName}`);
    } catch (err) {
      console.error(`Failed to generate preview for ${rawFileName}:`, err);
    }
  }
}
