import { DeleteController } from "./controllers/DeleteController";
import { StartController } from "./controllers/StartController";
import { UserRepository } from "./repositories/UserRepository";
import { UserService } from "./services/UserService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const startController = new StartController(userService);
const deleteController = new DeleteController(userService);

export { startController, deleteController };
