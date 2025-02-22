import { Context } from "telegraf";
import logger from "../utils/logger";


export class MessagesController {

  async handlerMessagesTexts(ctx: Context): Promise<void> {
    try {
      ctx.reply(
        `👋 ¡Hola! Gracias por tu texto`);
    } catch (error) {
      logger.error("❌ Error: ", error);
      ctx.reply("Ocurrió un error registrando tu usuario. Inténtalo de nuevo más tarde.");
    }
  }

  async handlerMessagesPhotos(ctx: Context): Promise<void> {
    try {
      ctx.reply(
        `👋 ¡Hola! Gracias por tu foto`);
    } catch (error) {
      logger.error("❌ Error: ", error);
      ctx.reply("Ocurrió un error registrando tu usuario. Inténtalo de nuevo más tarde.");
    }
  }
}