
export interface PieChartItem {
  name: string;
  fullName: string;
  value: number;
  price: number;
  totalAmount: number;
  color: string;
  percentage: string;
}

export const pieData: PieChartItem[] = [
  { 
    name: "15%", 
    fullName: "Plano Smartvoz 100GB + Minutos ilimitados", 
    value: 150, 
    price: 119.99,
    totalAmount: 150 * 119.99,
    color: "#F1D302", // amarelo
    percentage: "15%" 
  },
  { 
    name: "30%", 
    fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
    value: 300, 
    price: 129.99,
    totalAmount: 300 * 129.99,
    color: "#F28123", // laranja
    percentage: "30%" 
  },
  {
    name: "50%",
    fullName: "Plano Smartvoz 150GB + Minutos ilimitados",
    value: 500,
    price: 149.99,
    totalAmount: 500 * 149.99,
    color: "#F24236", // vermelho
    percentage: "50%"
  },
  {
    name: "60%",
    fullName: "Plano Smartvoz 200GB + Minutos ilimitados",
    value: 600,
    price: 179.99,
    totalAmount: 600 * 179.99,
    color: "#36D2CF", // turquesa
    percentage: "60%"
  },
  {
    name: "90%",
    fullName: "Plano Smartvoz Unlimited + Minutos ilimitados",
    value: 900,
    price: 199.99,
    totalAmount: 900 * 199.99,
    color: "#1D4E89", // azul escuro
    percentage: "90%"
  },
];

export const calculateTotalSalesAmount = (data: PieChartItem[]): number => {
  return data.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);
};
