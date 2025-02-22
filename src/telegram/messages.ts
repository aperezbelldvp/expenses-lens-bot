import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters';
import { messageController } from "../dependencyContainer";

export const registerMessage = (bot: Telegraf) => {
    bot.on("message", async (ctx) => messageController.handlerMessagesTexts(ctx));
}

export const registerDocument = (bot: Telegraf) => {
    bot.on(message('photo'), async (ctx) => messageController.handlerMessagesPhotos(ctx));
}