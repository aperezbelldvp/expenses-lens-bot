import path from "path";
import dotenv from "dotenv";

// Determina el archivo .env a cargar según NODE_ENV
const envFile = `.env.${process.env["NODE_ENV"] || "development"}`;
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

export default {
  NODE_ENV: process.env["NODE_ENV"] || "development",
  PORT: process.env["PORT"] || "3000",
  DATABASE_URL: process.env["DATABASE_URL"] || "",
  TELEGRAM_BOT_TOKEN: process.env["TELEGRAM_BOT_TOKEN"] || "",
};
