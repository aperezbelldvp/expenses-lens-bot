import axios from "axios";
import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { IOCRService } from "../interfaces/IOCRService";
import logger from "../utils/logger";

export class TesseractOCRService implements IOCRService {
  async extractText(imageUrl: string): Promise<string> {
    try {
      logger.info(`Downloading image: ${imageUrl}`);

      // Descargar la imagen y guardarla temporalmente
      const imagePath = await this.downloadImage(imageUrl);

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

  private async downloadImage(imageUrl: string): Promise<string> {
    try {
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "binary");

      const imagePath = path.join(__dirname, "..", "..", "temp", `ticket_${Date.now()}.jpg`);
      fs.writeFileSync(imagePath, buffer);

      logger.info(`Image saved: ${imagePath}`);
      return imagePath;
    } catch (error: any) {
      logger.error(`Error downloading image: ${error.message}`);
      throw new ImageDownloadError("Failed to download image from Telegram");
    }
  }
}

class OCRProcessingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OCRProcessingError";
    }
}

class ImageDownloadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageDownloadError";
    }
}
