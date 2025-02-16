import { Context } from "telegraf";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import logger from "../utils/logger";

export class StartController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async handlerStartCommand(ctx: Context): Promise<void> {
    try {
      logger.debug(`📤 Mensaje recibido: ${JSON.stringify(ctx.message)}`);
      const user = ctx.from;
      if (!user) return;

      const userData = new User(
        user.id,
        user.is_bot,
        user.first_name,
        user.last_name || null,
        user.username || null,
        user.language_code || null,
      );

      await this.userService.registerOrUpdateUser(userData);
      ctx.reply(
        `👋 ¡Hola, ${user.first_name}! Bienvenido a ExpenseLensBot, usa /help para ver los comandos disponibles.`,
      );
    } catch (error) {
      logger.error("❌ Error registering user: ", error);
      ctx.reply("Ocurrió un error registrando tu usuario. Inténtalo de nuevo más tarde.");
    }
  }
}
