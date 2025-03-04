import { ocrSpace, OcrSpaceResponse } from "ocr-space-api-wrapper";
import { IOCRService } from "../interfaces/IOCRService";
import logger from "../utils/logger";
import { ImagesService } from "./DownloadImageService";

export class OCRSpaceService implements IOCRService {
  async extractText(imageUrl: string): Promise<string | object> {
    let imagePath: string | undefined;
    try {
      logger.info(`Downloading image: ${imageUrl}`);

      // Descargar la imagen y guardarla temporalmente
      imagePath = await ImagesService.downloadImage(imageUrl);

      logger.info(`Image saved: ${imagePath}`);

      const OCRSpaceApiKey = process.env["OCRSpace_API_KEY"];
      if (!OCRSpaceApiKey) throw new Error("No OCR Space API Key found");

      logger.info("Sending OCR request");

      // Procesar la imagen con OCR con un límite de tiempo
      const responseOCR = (await this.processWithTimeout(
        ocrSpace(imagePath, { apiKey: OCRSpaceApiKey }),
        3000,
      )) as OcrSpaceResponse;

      logger.info("OCR request completed");
      if (responseOCR.ParsedResults.length <= 0 || !responseOCR.ParsedResults[0]?.ParsedText)
        throw new OCRProcessingError("OCR processing failed. No processed text returned");

      return responseOCR.ParsedResults[0].ParsedText;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`OCR error: ${errorMessage}`);
      throw new OCRProcessingError("OCR processing failed. Please try again.");
    } finally {
      if (imagePath) {
        // Eliminar la imagen después del procesamiento
        await ImagesService.deleteImage(imagePath);
      }
    }
  }

  private async processWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("OCR request timed out")), timeoutMs),
    );
    return Promise.race([promise, timeout]);
  }
}

class OCRProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OCRProcessingError";
  }
}
