import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";
import databaseClient from "../database/database";

export class PostgreSQLUserRepository implements IUserRepository {
  async findByTelegramId(telegramId: bigint): Promise<User | null> {
    const user = await databaseClient.findOne<any>("user", { telegramId });

    if (!user) return null;

    return new User(
      BigInt(user.telegramId),
      user.isBot,
      user.firstName,
      user.lastName,
      user.username,
      user.languageCode,
      user.createdAt,
      user.updatedAt,
      user.lastActiveAt
    );
  }

  async createOrUpdateUser(user: User): Promise<User> {
    const newUser = await databaseClient.upsert<any>(
      "user",
      { telegramId: user.telegramId },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        languageCode: user.languageCode,
        lastActiveAt: new Date(),
      }
    );

    return new User(
      BigInt(newUser.telegramId),
      newUser.isBot,
      newUser.firstName,
      newUser.lastName,
      newUser.username,
      newUser.languageCode,
      newUser.createdAt,
      newUser.updatedAt,
      newUser.lastActiveAt
    );
  }
}
