import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";

// eslint-disable-next-line no-unused-vars
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async registerOrUpdateUser(userData: User): Promise<User> {
    return this.userRepository.createOrUpdateUser(userData);
  }

  async getUserByTelegramId(telegramId: bigint): Promise<User | null> {
    return this.userRepository.findByTelegramId(telegramId);
  }
}
