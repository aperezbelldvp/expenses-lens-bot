import { Context } from "telegraf";
import { Message, PhotoSize } from "telegraf/types";
import logger from "../utils/logger";


export const contextMiddleware = async (ctx: Context, next: () => Promise<void>) => {

    try {
        const user = ctx.from;
        const message = ctx.message;

        if (!user || !message) {
            logger.warn("⚠️ Interaction received without user information or message");
            return next();
        }

        ctx.state["user"] = {
            id: user.id,
            isBot: user.is_bot,
            firstName: user.first_name,
            lastName: user.last_name || null,
            username: user.username || null,
            languageCode: user.language_code || null,
        };

        ctx.state["message"] = {
            chatId: message.chat.id,
            text: "text" in message ? message.text : null,
            date: message.date,
            messageId: message.message_id,
            photo: "photo" in message ? message.photo as PhotoSize[] : null,
            document: "document" in message ? message.document : null,
        };

        logger.debug(`User ${user.first_name} (${user.id})`);

        if (ctx.state["message"].photo) { // Si contiene foto, nos quedamos con la de más resolución
            const largestPhoto = ctx.state["message"].photo[ctx.state["message"].photo.length - 1]; // Obtener la mejor resolución disponible
            ctx.state["message"].photoUrl = await ctx.telegram.getFileLink(largestPhoto.file_id);
            logger.info(`📸 Imagen recibida: ${ctx.state["message"].photoUrl}`);
        }
        logger.debug('Message: ', ctx.state["message"]);

        await next();
    } catch (error) {
        logger.error("Error in contextMiddleware:", error);
        await next();
    }
}