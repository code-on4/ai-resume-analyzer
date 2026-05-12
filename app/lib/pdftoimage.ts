export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let loadPromise: Promise<any> | null = null;

async function loadPdfJs() {
    if (typeof window === "undefined") {
        throw new Error("PDF conversion can only run in the browser");
    }

    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
        const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs" as any);

        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.min.mjs",
            import.meta.url
        ).toString();

        return pdfjsLib;
    })();

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const pdfjsLib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer,
        }).promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 4 });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Could not create canvas context");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        await page.render({
            canvasContext: context,
            viewport,
        }).promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });

                        return;
                    }

                    const originalName = file.name.replace(/\.pdf$/i, "");

                    const imageFile = new File(
                        [blob],
                        `${originalName}.png`,
                        {
                            type: "image/png",
                        }
                    );

                    resolve({
                        imageUrl: URL.createObjectURL(blob),
                        file: imageFile,
                    });
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${String(err)}`,
        };
    }
}
