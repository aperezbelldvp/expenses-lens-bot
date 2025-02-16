import { NextFunction, Request, Response } from "express";
import { Context } from "telegraf";
import logger from "../utils/logger";

// Middleware para manejar errores en Express y Telegram
const errorMiddleware = (
  err: any,
  req?: Request,
  res?: Response,
  next?: NextFunction,
  ctx?: Context,
) => {
  logger.error(`❌ Error: ${err.message || "Unknown error"}`);

  if (res && req) {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: process.env["NODE_ENV"] === "development" ? err.stack : undefined,
    });
  } else if (ctx) {
    // Cogemos un mensaje de error random
    ctx.reply(funnyResponses[Math.floor(Math.random() * funnyResponses.length)] as string);
  }
};

const funnyResponses = [
  "🤖 Ups... parece que el bot ha tropezado con un cable. ¡Inténtalo de nuevo!",
  "⚡ ¡Error detectado! Probando con un poco de cinta adhesiva...",
  "💻 Error crítico: El bot necesita un café antes de seguir trabajando.",
  "🚨 ¡Error 404: paciencia no encontrada! Prueba otra vez.",
  "🤯 Mi código acaba de entrar en pánico... mejor prueba más tarde.",
  "⛔️ ¡Error fatal! Llamando a los ingenieros... ah, espera, soy solo un bot.",
  "🔧 Un engranaje se ha salido de lugar. Déjame intentar arreglarlo...",
  "🐞 Error encontrado: un bug ha invadido mi sistema. Lo estamos cazando...",
  "🤖 Bzzzt... *recalculando*... Algo salió mal, pero no sé qué. ¿Lo intentas de nuevo?",
  "🔥 El bot ha explotado... (mentira, pero casi). ¡Prueba otra vez!",
];



export default errorMiddleware;
