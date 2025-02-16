import { User } from "../models/User";

export interface IUserRepository {
  findByTelegramId(telegramId: number): Promise<User | null>;
  createOrUpdateUser(user: User): Promise<User>;
  deleteUser(telegramId: number): Promise<void>;
}
