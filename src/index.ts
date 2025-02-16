import databaseClient from "./database/database";
import errorMiddleware from "./middlewares/errorMiddleware";
import { startBot } from "./telegram/bot";

const startService = async () => {
  try {
    await databaseClient.connect();
    await startBot();
  } catch (error) {
    errorMiddleware(error);
    process.exit(1); // Cierra el proceso si hay un error crítico
  }
};

startService();
