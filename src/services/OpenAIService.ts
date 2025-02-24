import OpenAI from 'openai';
import { IAIService } from '../interfaces/IAIService';
import logger from '../utils/logger';
import { AppError } from '../utils/AppError';
import { receiptPrompt } from '../prompts/receiptPrompt';


export class OpenAIService implements IAIService {
    private openAIClient: OpenAI;

    constructor() {
        const openAIApiKey = process.env['OPENAI_API_KEY'];
        if (!openAIApiKey) throw new AppError("No OpenAI API Key found")
        this.openAIClient = new OpenAI({
            apiKey: process.env['OPENAI_API_KEY'],
        });
    }

    async analyzeReceipt(text: string): Promise<{
        subtotal: string;
        iva: string;
        total: string;
        productos: { cantidad: number; nombre: string; precio_unitario: string; precio_total: string; categoria: string }[];
    }> {
        try {
            logger.info("🔍 Enviando datos a IA para análisis...");

            const prompt = receiptPrompt(text);

            const response = await this.openAIClient.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: prompt }],
                temperature: 0.3,
            });

            let result = response.choices[0]?.message?.content || "{}";

            // Quitamos etiquetas Markdown de la respuesta
            result = result.replace(/```json|```/g, "").trim();
            return JSON.parse(result);
        } catch (error: any) {
            logger.error(`❌ Error en la IA: ${error.message}`);
            throw new Error("Error analizando el ticket con IA.");
        }
    }

}