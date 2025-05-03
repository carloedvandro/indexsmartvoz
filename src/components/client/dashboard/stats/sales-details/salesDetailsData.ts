
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
    name: "100GB", 
    fullName: "Plano Smartvoz 100GB + Minutos ilimitados", 
    value: 300, 
    price: 119.99,
    totalAmount: 300 * 119.99,
    color: "#8e44ad",
    percentage: "30%" 
  },
  { 
    name: "120GB", 
    fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
    value: 250, 
    price: 129.99,
    totalAmount: 250 * 129.99,
    color: "#e67e22",
    percentage: "25%" 
  },
  {
    name: "150GB",
    fullName: "Plano Smartvoz 150GB + Minutos ilimitados",
    value: 200,
    price: 149.99,
    totalAmount: 200 * 149.99,
    color: "#e74c3c",
    percentage: "20%"
  },
  {
    name: "200GB",
    fullName: "Plano Smartvoz 200GB + Minutos ilimitados",
    value: 100,
    price: 179.99,
    totalAmount: 100 * 179.99,
    color: "#f1c40f",
    percentage: "10%"
  },
  {
    name: "Unlimited",
    fullName: "Plano Smartvoz Unlimited + Minutos ilimitados",
    value: 150,
    price: 199.99,
    totalAmount: 150 * 199.99,
    color: "#27ae60",
    percentage: "15%"
  },
];

export const calculateTotalSalesAmount = (data: PieChartItem[]): number => {
  return data.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);
};
