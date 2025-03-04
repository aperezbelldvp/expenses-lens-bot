export class ReceiptItem {
  constructor(
    public id: string,
    public receiptId: string,
    public name: string,
    public quantity: number,
    public unitPrice: number,
    public totalPrice: number,
    public category?: string | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
