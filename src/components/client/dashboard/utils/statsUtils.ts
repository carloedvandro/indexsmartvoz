import { formatCurrency } from "@/utils/format";

export const generateCardData = () => {
  return [
    {
      title: "Ganhos Ativos",
      value: formatCurrency(130510),
      data: generateMonthlyData(),
      color: "#4F46E5",
    },
    {
      title: "Ganhos Pendentes",
      value: formatCurrency(175035),
      data: generateMonthlyData(),
      color: "#ff0000",  // Changed to red
    },
    {
      title: "Total de Ganhos",
      value: formatCurrency(210375),
      data: generateMonthlyData(),
      color: "#00d71c",
    },
  ];
};

const generateMonthlyData = () => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 100000),
  }));
};

export const generateRevenueData = () => {
  const data = [];
  const startDate = new Date(2024, 0, 1);
  const baseValue = 5000;
  let previousValue = baseValue;

  for (let i = 0; i < 31; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Gera um valor que varia suavemente em relação ao anterior
    const variation = (Math.random() - 0.5) * 2000;
    const newValue = Math.max(previousValue + variation, 1000);
    previousValue = newValue;

    data.push({
      name: `${String(currentDate.getDate()).padStart(2, "0")} de jan.`,
      value: Math.floor(newValue),
    });
  }

  return data;
};