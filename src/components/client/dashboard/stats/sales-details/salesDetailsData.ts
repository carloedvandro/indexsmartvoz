
export interface SalesPlanData {
  name: string;
  fullName: string;
  value: number;
  price: number;
  totalAmount: number;
  color: string;
}

export type TimePeriod = "daily" | "weekly" | "monthly";

// Function to generate simulated sales data based on time period
export const generateSalesData = (period: TimePeriod = "monthly"): SalesPlanData[] => {
  // Base data - this is our monthly data
  const baseData = [
    { 
      name: "110GB", 
      fullName: "Plano Smartvoz 110GB + Minutos ilimitados", 
      value: 300, 
      price: 109.99,
      totalAmount: 300 * 109.99,
      color: "#8425af" 
    },
    { 
      name: "120GB", 
      fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
      value: 250, 
      price: 119.99,
      totalAmount: 250 * 119.99,
      color: "#33C3F0" 
    },
    { 
      name: "130GB", 
      fullName: "Plano Smartvoz 130GB + Minutos ilimitados", 
      value: 210, 
      price: 129.99,
      totalAmount: 210 * 129.99,
      color: "#8B5CF6" 
    },
    { 
      name: "140GB", 
      fullName: "Plano Smartvoz 140GB + Minutos ilimitados", 
      value: 180, 
      price: 139.99,
      totalAmount: 180 * 139.99,
      color: "#0ea5e9" 
    },
    { 
      name: "150GB", 
      fullName: "Plano Smartvoz 150GB + Minutos ilimitados", 
      value: 120, 
      price: 149.99,
      totalAmount: 120 * 149.99,
      color: "#f97316" 
    }
  ];
  
  // Scale factors for different time periods
  const scaleFactor = {
    daily: 1/30,
    weekly: 7/30,
    monthly: 1
  };
  
  // Apply scaling based on selected period
  return baseData.map(item => {
    const scaledValue = Math.round(item.value * scaleFactor[period]);
    return {
      ...item,
      value: scaledValue,
      totalAmount: Number((scaledValue * item.price).toFixed(2))
    };
  });
};

export const calculateTotalSalesAmount = (data: SalesPlanData[]): number => {
  return data.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);
};

// Get a formatted label for the time period
export const getTimePeriodLabel = (period: TimePeriod): string => {
  switch(period) {
    case "daily": return "Hoje";
    case "weekly": return "Esta semana";
    case "monthly": return "Este mês";
    default: return "Este mês";
  }
};
