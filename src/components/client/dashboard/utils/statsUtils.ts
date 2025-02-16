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
      color: "#ff0000",
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
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];

  return months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 100000),
  }));
};

export const generateRevenueData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(1); // Primeiro dia do mês atual
  const currentDate = new Date();
  
  let accumulatedValue = 0;
  const dailyRevenues = new Map(); // Armazena os valores diários

  // Gera valores diários aleatórios para o mês atual
  for (let i = 0; i < currentDate.getDate(); i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Gera um valor diário entre 1000 e 5000
    const dailyValue = Math.floor(Math.random() * 4000) + 1000;
    dailyRevenues.set(date.getDate(), dailyValue);
    
    // Acumula o valor
    accumulatedValue += dailyValue;
    
    data.push({
      name: `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`,
      value: accumulatedValue,
      dailyValue: dailyValue,
    });
  }

  return data;
};