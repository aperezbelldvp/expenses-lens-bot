import { ocrSpace } from "ocr-space-api-wrapper";
import { IOCRService } from "../interfaces/IOCRService";
import logger from "../utils/logger";
import { ImageService } from "./ImageService";
import fs from 'fs';


export class OCRSpaceService implements IOCRService {
    async extractText(imageUrl: string): Promise<string | object> {
        try {
            logger.info(`Downloading image: ${imageUrl}`);
      
            // Descargar la imagen y guardarla temporalmente
            const imagePath = await ImageService.downloadImage(imageUrl);

            const OCRSpaceApiKey = process.env["OCRSpace_API_KEY"];
            if(!OCRSpaceApiKey) throw new Error("No OCR Space API Key found");
      
            // Procesar la imagen con OCR
            const responseOCR = await ocrSpace(imagePath, )
      
            // Eliminar la imagen después del procesamiento
            fs.unlinkSync(imagePath);
      
            return responseOCR;
          } catch (error: unknown) {
            if (error instanceof Error) {
              logger.error(`OCR error: ${error.message}`);
              throw new OCRProcessingError("OCR processing failed. Please try again.");
            } else {
              logger.error(`OCR error: ${error}`);
              throw new OCRProcessingError("OCR processing failed. Please try again.");
            }
          }
    }
    
}

class OCRProcessingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OCRProcessingError";
    }
}