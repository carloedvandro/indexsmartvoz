
export interface MonthData {
  month: string;
  day: string;
  active: boolean;
  upValue: number;
  downValue: number;
}

export const getMonthsData = (activeMonth: string = "Abr"): MonthData[] => {
  return [
    { month: "Jan", day: "25", active: activeMonth === "Jan", upValue: 0, downValue: 0 },
    { month: "Fev", day: "25", active: activeMonth === "Fev", upValue: 0, downValue: 0 },
    { month: "Mar", day: "25", active: activeMonth === "Mar", upValue: 0, downValue: 0 },
    { month: "Abr", day: "25", active: activeMonth === "Abr", upValue: 0, downValue: 0 },
    { month: "Mai", day: "25", active: activeMonth === "Mai", upValue: 0, downValue: 0 },
    { month: "Jun", day: "25", active: activeMonth === "Jun", upValue: 0, downValue: 0 },
    { month: "Jul", day: "25", active: activeMonth === "Jul", upValue: 0, downValue: 0 },
    { month: "Ago", day: "25", active: activeMonth === "Ago", upValue: 0, downValue: 0 },
    { month: "Set", day: "25", active: activeMonth === "Set", upValue: 0, downValue: 0 },
    { month: "Out", day: "25", active: activeMonth === "Out", upValue: 0, downValue: 0 },
    { month: "Nov", day: "25", active: activeMonth === "Nov", upValue: 0, downValue: 0 },
    { month: "Dez", day: "25", active: activeMonth === "Dez", upValue: 0, downValue: 0 },
  ];
};
