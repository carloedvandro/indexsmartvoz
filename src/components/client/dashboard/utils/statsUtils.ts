import { formatCurrency } from "@/utils/format";

export const generateChartData = (baseValue: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    name: month,
    value: Math.floor(baseValue * (1 + Math.sin(index / 2) * 0.5))
  }));
};

export const generateRevenueData = () => {
  const dates = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(2025, 0, i + 1);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  });

  return dates.map((date) => ({
    name: date,
    value: Math.floor(Math.random() * 10000)
  }));
};

export const generateCardData = () => {
  return [
    {
      title: "Ganhos Ativos",
      value: formatCurrency(130510),
      data: generateChartData(130510),
      color: "#786AFF"
    },
    {
      title: "Ganhos Pendentes",
      value: formatCurrency(175035),
      data: generateChartData(175035),
      color: "#5E60CE"
    },
    {
      title: "Total de Ganhos",
      value: formatCurrency(210375),
      data: generateChartData(210375),
      color: "#7B61FF"
    }
  ];
};