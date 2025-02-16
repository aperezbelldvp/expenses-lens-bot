import winston from "winston";
import "winston-daily-rotate-file";

// Definimos los niveles en función del entorno
const level = process.env["NODE_ENV"] === "production" ? "info" : "debug";

// Formato de los logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  }),
);

const transports = [];

// Logs para dev y test
if (process.env["NODE_ENV"] !== "production") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}

// Logs pro
if (process.env["NODE_ENV"] === "production") {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "error",
    }),
  );
}

// Crear el logger
const logger = winston.createLogger({
  level,
  format: logFormat,
  transports,
});

export default logger;
