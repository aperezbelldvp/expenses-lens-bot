import { DeleteController } from "./controllers/DeleteController";
import { MessagesController } from "./controllers/MessageController";
import { StartController } from "./controllers/StartController";
import { UserRepository } from "./repositories/UserRepository";
import { UserService } from "./services/UserService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const startController = new StartController(userService);
const deleteController = new DeleteController(userService);
const messageController = new MessagesController()

export { deleteController, startController, messageController };

