import { ReceiptItem } from "../models/ReceiptItem";

export interface IReceiptItemRepository {
  findById(id: string): Promise<ReceiptItem | null>;
  findByReceiptId(receiptId: string): Promise<ReceiptItem[]>;
  createReceiptItem(receiptItem: ReceiptItem): Promise<ReceiptItem>;
  updateReceiptItem(id: string, receiptItem: Partial<ReceiptItem>): Promise<ReceiptItem>;
  deleteReceiptItem(id: string): Promise<void>;
}
