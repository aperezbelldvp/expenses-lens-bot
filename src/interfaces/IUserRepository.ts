import { User } from "../models/User";

export interface IUserRepository {
  findByTelegramId(telegramId: bigint): Promise<User | null>;
  createOrUpdateUser(user: User): Promise<User>;
}
