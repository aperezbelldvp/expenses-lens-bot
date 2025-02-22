import { IOCRService } from "../interfaces/IOCRService";
import logger from "../utils/logger";

export class TicketService {
    private readonly ocrService: IOCRService;

    constructor(ocrService: IOCRService) {
        this.ocrService = ocrService;
    }

    async processTicket(imageUrl: string): Promise<string> {
        logger.info(`🔍 Procesando ticket desde: ${imageUrl}`);

        // Extraer el texto del ticket con OCR
        const extractedText = await this.ocrService.extractText(imageUrl);

        // En este punto, podemos aplicar procesamiento del texto extraído
        logger.info(`Info extract with OCR:\n${extractedText}`);

        return extractedText;
    }
}
