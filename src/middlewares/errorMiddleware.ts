import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

// Middleware global de manejo de errores
const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err as AppError;

  if (!(err instanceof AppError)) {
    statusCode = 500;
    message = "❌ Error interno del servidor.";
  }

  // Log del error (en producción se puede guardar en archivos)
  logger.error(`🚨 Error: ${message} - Status: ${statusCode} - URL: ${req.originalUrl}`);

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorMiddleware;
