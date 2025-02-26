import { IAIService } from "../interfaces/IAIService";
import { IOCRService } from "../interfaces/IOCRService";
import logger from "../utils/logger";

export class TicketService {
    private readonly ocrService: IOCRService;
    private readonly aiService: IAIService;

    constructor(ocrService: IOCRService, aiService: IAIService) {
        this.ocrService = ocrService;
        this.aiService = aiService;
    }

    async processTicket(imageUrl: string): Promise<string> {
        logger.info(`🔍 Procesando ticket desde: ${imageUrl}`);

        // Extraer el texto del ticket con OCR
        const extractedText = await this.ocrService.extractText(imageUrl);

        // En este punto, podemos aplicar procesamiento del texto extraído
        logger.info(`Info extract with OCR:\n${extractedText}`);
        const processIAData = await this.aiService.analyzeReceipt(JSON.stringify(extractedText));

        return JSON.stringify(processIAData);
    }
}
