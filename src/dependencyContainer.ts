import { DeleteController } from "./controllers/DeleteController";
import { MessagesController } from "./controllers/MessageController";
import { StartController } from "./controllers/StartController";
import { UserRepository } from "./repositories/UserRepository";
import { OCRSpaceService } from "./services/OCRSpaceService";
import { OpenAIService } from "./services/OpenAIService";
import { TesseractOCRService } from "./services/TesseractOCRService";
import { TicketService } from "./services/TicketService";
import { UserService } from "./services/UserService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const startController = new StartController(userService);
const deleteController = new DeleteController(userService);
const messageController = new MessagesController();
const tesseractOCRService = new TesseractOCRService();
const oCRSpaceService = new OCRSpaceService();

const aiService = new OpenAIService();
const ticketService = new TicketService(oCRSpaceService, aiService);

export {
  deleteController,
  messageController,
  tesseractOCRService as ocrService,
  startController,
  ticketService,
};
