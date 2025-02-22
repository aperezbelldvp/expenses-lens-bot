import { Telegraf } from "telegraf";
import config from "../config";
import errorMiddleware from "../middlewares/errorMiddleware";
import logger from "../utils/logger";
import { registerCommands } from "./commands";
import { registerDocument, registerMessage } from "./messages";
import { contextMiddleware } from "../middlewares/contextMiddleware";

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

export const startBot = async () => {
  try {
    logger.info("🤖 Starting Telegram bot...");

    // Limpiamos eventos previos antes de registrar nuevos, evita duplicidad
    const botInfo = await bot.telegram.getMe();
    logger.info(`✅ Bot conectado: ${botInfo.username}`);

    bot.use(contextMiddleware);

    // Comandos
    registerCommands(bot);

    // Fotos o PDF
    registerDocument(bot)

    // Mensajes
    registerMessage(bot);

    await bot.launch();
    logger.info("🚀 Bot successfully launched!");

    process.once("SIGINT", () => {
      logger.warn("⛔ Bot stopped due to SIGINT");
      bot.stop("SIGINT");
    });
    process.once("SIGTERM", () => {
      logger.warn("⛔ Bot stopped due to SIGTERM");
      bot.stop("SIGTERM");
    });
  } catch (error) {
    errorMiddleware(error);
    process.exit(1); // Detiene el proceso si el bot no puede iniciarse correctamente
  }
};
