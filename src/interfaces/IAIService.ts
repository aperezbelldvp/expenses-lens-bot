export interface IAIService {
  analyzeReceipt(text: string): Promise<{
    subtotal: string;
    iva: string;
    total: string;
    productos: {
      cantidad: number;
      nombre: string;
      precio_unitario: string;
      precio_total: string;
      categoria: string;
    }[];
  }>;
}
