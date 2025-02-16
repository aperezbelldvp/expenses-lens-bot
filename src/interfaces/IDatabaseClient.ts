/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  findOne<T>(table: string, where: object): Promise<T | null>;
  findMany<T>(table: string, where?: object): Promise<T[]>;

  create<T>(table: string, data: object): Promise<T>;
  update<T>(table: string, where: object, data: object): Promise<T>;
  upsert<T>(table: string, where: object, data: object): Promise<T>;

  delete<T>(table: string, where: object): Promise<void>;

  executeRaw<T>(query: string, params?: any[]): Promise<T>;
}
