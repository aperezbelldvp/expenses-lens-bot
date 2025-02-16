import { Context } from "telegraf";

export const helpHandler = (ctx: Context) => {
  ctx.reply(
    "📌 Comandos disponibles:\n" +
      "/start - Iniciar el bot\n" +
      "/help - Mostrar ayuda\n" +
      "/delete - Eliminar usuario",
  );
};
