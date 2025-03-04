import { ReceiptItem } from "./ReceiptItem";

export class Receipt {
  constructor(
    public id: string,
    public userId: string,
    public storeName: string,
    public date: Date,
    public iva: number,
    public total: number,
    public subtotal: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public items?: ReceiptItem[],
  ) {}
}
