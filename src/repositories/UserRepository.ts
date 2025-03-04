import databaseClient from "../database/database";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";

export class UserRepository implements IUserRepository {
  async findByTelegramId(telegramId: number): Promise<User | null> {
    const user = await databaseClient.findOne<User>("user", { telegramId });

    if (!user) return null;

    return new User(
      user.telegramId,
      user.isBot,
      user.firstName,
      user.lastName,
      user.username,
      user.languageCode,
      user.createdAt,
      user.updatedAt,
      user.lastActiveAt,
    );
  }

  async createOrUpdateUser(user: User): Promise<User> {
    const newUser = await databaseClient.upsert<User>(
      "user",
      { telegramId: user.telegramId },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        languageCode: user.languageCode,
        lastActiveAt: new Date(),
      },
    );
    return new User(
      newUser.telegramId,
      newUser.isBot,
      newUser.firstName,
      newUser.lastName,
      newUser.username,
      newUser.languageCode,
      newUser.createdAt,
      newUser.updatedAt,
      newUser.lastActiveAt,
    );
  }

  async deleteUser(telegramId: number): Promise<void> {
    await databaseClient.delete("user", { telegramId });
  }
}
