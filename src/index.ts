import { UserController } from "./controllers/UserController";
import databaseClient from "./database/database";
import { PostgreSQLUserRepository } from "./repositories/PostgreSQLUserRepository";
import { UserService } from "./services/UserService";
import bot from "./telegram/bot";
import logger from "./utils/logger";

// Inyectamos dependencias
const userRepository = new PostgreSQLUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const startBot = async () => {
  await databaseClient.connect();

  logger.info("🤖 Telegram bot is running...");

  // Limpiamos eventos previos antes de registrar nuevos, evita duplicidad
  bot.telegram.getMe().then((botInfo) => {
    logger.info(`✅ Bot conectado: ${botInfo.username}`);
  });

  bot.on("message", async (ctx) => userController.handleNewMessage(ctx));

  await bot.launch();

  process.once("SIGINT", () => {
    logger.warn("⛔ Bot stopped due to SIGINT");
    bot.stop("SIGINT");
  });
  process.once("SIGTERM", () => {
    logger.warn("⛔ Bot stopped due to SIGTERM");
    bot.stop("SIGTERM");
  });
};

startBot();
