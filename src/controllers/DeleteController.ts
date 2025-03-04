import { Context } from "telegraf";
import errorMiddleware from "../middlewares/errorMiddleware";
import { UserService } from "../services/UserService";
import logger from "../utils/logger";

export class DeleteController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async handlerDeleteCommand(ctx: Context): Promise<void> {
    try {
      console.log(ctx.message);
      const telegramId = ctx.message?.chat.id;
      if (!telegramId) throw new Error("No telegram Id.");
      await this.userService.deleteUser(telegramId);

      ctx.reply("Tu usuario ha sido eliminado correctamente.");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Error eliminando usuario: ${errorMessage}`);
      errorMiddleware(error, undefined, undefined, undefined, ctx);
    }
  }
}
