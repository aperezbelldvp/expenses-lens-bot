import { Context } from "telegraf";
import { ticketService } from "../dependencyContainer";
import logger from "../utils/logger";


export class MessagesController {

  async handlerMessagesTexts(ctx: Context): Promise<void> {
    try {
      ctx.reply(
        `👋 ¡Hola! Gracias por tu texto`);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.reply("Ocurrió un error registrando tu usuario. Inténtalo de nuevo más tarde.");
    }
  }

  async handlerMessagesPhotos(ctx: Context): Promise<void> {
    try {
      if (!ctx.state["message"].photoUrl) {
        ctx.reply("Por favor, solo fotos de tus tickets de la compra");
        return;
      }

      // Extraer texto con OCR
      const extractedText = await ticketService.processTicket(ctx.state["message"].photoUrl);

      ctx.reply(`✅ Ticket procesado: \n${extractedText}`);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.reply("Ocurrió un error registrando tu usuario. Inténtalo de nuevo más tarde.");
    }
  }
}