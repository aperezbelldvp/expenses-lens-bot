import fs from "fs";
import Tesseract from "tesseract.js";
import { IOCRService } from "../interfaces/IOCRService";
import logger from "../utils/logger";
import { ImageService } from "./ImageService";

export class TesseractOCRService implements IOCRService {
  async extractText(imageUrl: string): Promise<string> {
    try {
      logger.info(`Downloading image: ${imageUrl}`);

      // Descargar la imagen y guardarla temporalmente
      const imagePath = await ImageService.downloadImage(imageUrl);

      // Procesar la imagen con OCR
      const { data } = await Tesseract.recognize(imagePath, "spa", {
        logger: (m) => logger.info(m), // Muestra progreso en logs
      });

      // Eliminar la imagen después del procesamiento
      fs.unlinkSync(imagePath);

      return data.text;
    } catch (error: any) {
      logger.error(`OCR error: ${error.message}`);
      throw new OCRProcessingError("OCR processing failed. Please try again.");
    }
  }
}

class OCRProcessingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OCRProcessingError";
    }
}
