import { Receipt } from "../models/Receipt";

export interface IReceiptRepository {
  findById(id: string): Promise<Receipt | null>;
  findByUserId(userId: string): Promise<Receipt[]>;
  createReceipt(receipt: Receipt): Promise<Receipt>;
  updateReceipt(id: string, receipt: Partial<Receipt>): Promise<Receipt>;
  deleteReceipt(id: string): Promise<void>;
}
