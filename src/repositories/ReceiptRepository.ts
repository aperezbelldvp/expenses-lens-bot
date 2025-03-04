import databaseClient from "../database/database";
import { IReceiptRepository } from "../interfaces/IReceiptRepository";
import { Receipt } from "../models/Receipt";

export class ReceiptRepository implements IReceiptRepository {
  async findById(id: string): Promise<Receipt | null> {
    const receipt = await databaseClient.findOne<Receipt>("receipt", { id });

    if (!receipt) return null;

    return new Receipt(
      receipt.id,
      receipt.userId,
      receipt.storeName,
      receipt.date,
      receipt.iva,
      receipt.total,
      receipt.subtotal,
      receipt.createdAt,
      receipt.updatedAt,
      receipt.items,
    );
  }

  findByUserId(userId: string): Promise<Receipt[]> {
    throw new Error("Method not implemented.");
  }

  async createReceipt(receipt: Receipt): Promise<Receipt> {
    const newReceipt = await databaseClient.create<Receipt>("receipt", {
      id: receipt.id,
      userId: receipt.userId,
      storeName: receipt.storeName,
      date: receipt.date,
      iva: receipt.iva,
      total: receipt.total,
      subtotal: receipt.subtotal,
      createdAt: receipt.createdAt,
      updatedAt: receipt.updatedAt,
      items: receipt.items,
    });

    return new Receipt(
      newReceipt.id,
      newReceipt.userId,
      newReceipt.storeName,
      newReceipt.date,
      newReceipt.iva,
      newReceipt.total,
      newReceipt.subtotal,
      newReceipt.createdAt,
      newReceipt.updatedAt,
      newReceipt.items,
    );
  }

  updateReceipt(id: string, receipt: Partial<Receipt>): Promise<Receipt> {
    throw new Error("Method not implemented.");
  }

  deleteReceipt(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
