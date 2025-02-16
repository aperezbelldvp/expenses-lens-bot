import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// Middleware para manejar errores
const errorMiddleware = (err: any, req?: Request, res?: Response, next?: NextFunction) => {
  logger.error(`❌ Error: ${err.message || "Unknown error"}`);

  // Si el error viene de una solicitud HTTP, responder con JSON
  if (res && req) {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      stack: process.env["NODE_ENV"] === "development" ? err.stack : undefined,
    });
  } else {
    logger.error("⚠️ Error:", err);
  }
};

export default errorMiddleware;
