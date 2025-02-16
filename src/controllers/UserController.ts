import { Context } from "telegraf";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import logger from "../utils/logger";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async handleNewMessage(ctx: Context): Promise<void> {
    try {
      logger.info("📤 Mensaje recibido: ", ctx.message)
      const user = ctx.from;
      if (!user) return;

      const userData = new User(
        BigInt(user.id),
        user.is_bot,
        user.first_name,
        user.last_name || null,
        user.username || null,
        user.language_code || null
      );

      await this.userService.registerOrUpdateUser(userData);
      ctx.reply(`👋 ¡Hola, ${user.first_name}! Ya estás registrado.`);
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
      ctx.reply("❌ Ocurrió un error registrando tu usuario. Inténtalo de nuevo más tarde.");
    }
  }
}



