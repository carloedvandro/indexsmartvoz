export interface MonthData {
  month: string;
  day: string;
  active: boolean;
  upValue: number;
  downValue: number;
  date?: Date;
}

export const getDailyData = (activeDay: string = ""): MonthData[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const result: MonthData[] = [];
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const day = i.toString();
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date).replace('.', '');
    const monthDay = `${day}/${month}`;
    
    const baseUp = 10000 + (i * 200);
    const baseDown = 7000 + (i * 100);
    const randomVariationUp = Math.floor(Math.random() * 2000);
    const randomVariationDown = Math.floor(Math.random() * 1500);
    
    result.push({
      month: month.charAt(0).toUpperCase() + month.slice(1),
      day,
      active: activeDay === monthDay,
      upValue: baseUp + randomVariationUp,
      downValue: baseDown + randomVariationDown,
      date
    });
  }
  
  return result;
};

export const getMonthsData = (activeMonth: string = "Abr"): MonthData[] => {
  return [
    { month: "Jan", day: "25", active: activeMonth === "Jan", upValue: 12500, downValue: 8900 },
    { month: "Fev", day: "25", active: activeMonth === "Fev", upValue: 13200, downValue: 9500 },
    { month: "Mar", day: "25", active: activeMonth === "Mar", upValue: 15800, downValue: 10200 },
    { month: "Abr", day: "25", active: activeMonth === "Abr", upValue: 16200, downValue: 9800 },
    { month: "Mai", day: "25", active: activeMonth === "Mai", upValue: 18500, downValue: 12300 },
    { month: "Jun", day: "25", active: activeMonth === "Jun", upValue: 19200, downValue: 13800 },
    { month: "Jul", day: "25", active: activeMonth === "Jul", upValue: 21500, downValue: 14200 },
    { month: "Ago", day: "25", active: activeMonth === "Ago", upValue: 22800, downValue: 15900 },
    { month: "Set", day: "25", active: activeMonth === "Set", upValue: 19500, downValue: 12700 },
    { month: "Out", day: "25", active: activeMonth === "Out", upValue: 23400, downValue: 16200 },
    { month: "Nov", day: "25", active: activeMonth === "Nov", upValue: 24500, downValue: 17300 },
    { month: "Dez", day: "25", active: activeMonth === "Dez", upValue: 26700, downValue: 18500 },
  ];
};
