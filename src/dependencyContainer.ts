import { StartController } from "./controllers/StartController";
import { PostgreSQLUserRepository } from "./repositories/PostgreSQLUserRepository";
import { UserService } from "./services/UserService";

const userRepository = new PostgreSQLUserRepository();
const userService = new UserService(userRepository);
const startController = new StartController(userService);

export { startController };
