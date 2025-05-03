
export interface PieDataItem {
  name: string;
  fullName: string;
  value: number;
  price: number;
  totalAmount: number;
  percentage: number;
  salesCount: number;
  color: string;
}

export interface TooltipData {
  x: number;
  y: number;
  data: any;
}
