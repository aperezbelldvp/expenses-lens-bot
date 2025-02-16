import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { startController } from "../dependencyContainer";
import { helpHandler } from "./handlers/helpHandler";

// Asociamos comandos con controllers
const commands = {
  start: (ctx: Context<Update>) => startController.handlerStartCommand(ctx), // 👈 Usamos función flecha
  help: helpHandler,
};

// Registrar automáticamente todos los comandos
export const registerCommands = (bot: Telegraf) => {
  Object.entries(commands).forEach(([command, handler]) => {
    bot.command(command, (ctx) => handler(ctx));
  });
};
