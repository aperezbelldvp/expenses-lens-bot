import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";
import { NotFoundError } from "../utils/AppError";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async registerOrUpdateUser(userData: User): Promise<User> {
    return this.userRepository.createOrUpdateUser(userData);
  }

  async getUserByTelegramId(telegramId: number): Promise<User> {
    const user = await this.userRepository.findByTelegramId(telegramId);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async deleteUser(telegramId: number): Promise<void> {
    const user = await this.userRepository.findByTelegramId(telegramId);
    if (!user) throw new NotFoundError("User not found");
    await this.userRepository.deleteUser(telegramId);
  }
}
