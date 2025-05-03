
export interface SalesDataItem {
  name: string;
  fullName: string;
  value: number;
  price: number;
  totalAmount: number;
  formattedAmount?: string;
  color: string;
  gradientColor?: string;
  percentage?: number;
}

export interface TooltipData {
  x: number;
  y: number;
  data: any;
}
