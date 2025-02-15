import databaseClient from "./database/database";
import bot from "./telegram/bot";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { PostgreSQLUserRepository } from "./repositories/PostgreSQLUserRepository";

// Inyectamos dependencias
const userRepository = new PostgreSQLUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const startBot = async () => {
  await databaseClient.connect();

  console.log("🤖 Telegram bot is running...");

  // 🛑 Primero, limpiamos eventos previos antes de registrar nuevos
  bot.telegram.getMe().then((botInfo) => {
    console.log(`✅ Bot conectado: ${botInfo.username}`);
  });

  // bot.removeListener("message", userController.handleNewMessage); // 🛑 Esto elimina duplicaciones
  bot.on("message", async (ctx) => userController.handleNewMessage(ctx));

  await bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};

startBot();
