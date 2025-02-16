import { PrismaClient } from "@prisma/client";
import { IDatabaseClient } from "../interfaces/IDatabaseClient";
import logger from "../utils/logger";

export class PrismaDatabaseClient implements IDatabaseClient {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async connect(): Promise<void> {
        await this.prisma.$connect();
        logger.info("✅ Connected to the database using Prisma.");
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
        logger.info("❌ Disconnected from the database.");
    }

    async findOne<T>(table: string, where: object): Promise<T | null> {
        return (this.prisma as any)[table].findUnique({ where });
    }

    async findMany<T>(table: string, where?: object): Promise<T[]> {
        return (this.prisma as any)[table].findMany({ where });
    }

    async create<T>(table: string, data: object): Promise<T> {
        return (this.prisma as any)[table].create({ data });
    }

    async update<T>(table: string, where: object, data: object): Promise<T> {
        return (this.prisma as any)[table].update({ where, data });
    }

    async upsert<T>(table: string, where: object, data: object): Promise<T> {
        return (this.prisma as any)[table].upsert({
            where,
            update: data,
            create: { ...where, ...data },
        });
    }


    async delete<T>(table: string, where: object): Promise<void> {
        await (this.prisma as any)[table].delete({ where });
    }

    async executeRaw<T>(query: string, params?: any[]): Promise<T> {
        return await this.prisma.$queryRawUnsafe(query, ...(params || []));
    }
}
