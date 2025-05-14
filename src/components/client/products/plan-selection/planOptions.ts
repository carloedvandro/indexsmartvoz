
export const internetOptions = [
  { value: "110GB", label: "Smartvoz 110GB + Minutos ilimitados", price: 45.00 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 55.00 },
  { value: "130GB", label: "Smartvoz 130GB + Minutos ilimitados", price: 65.00 },
  { value: "140GB", label: "Smartvoz 140GB + Minutos ilimitados", price: 75.00 },
  { value: "19GB", label: "Easy 19GB + Cashback R$10,00", price: 45.00 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-110":
      return { plan: "110GB", price: 45.00 };
    case "smartvoz-120":
      return { plan: "120GB", price: 55.00 };
    case "smartvoz-130":
      return { plan: "130GB", price: 65.00 };
    case "smartvoz-140":
      return { plan: "140GB", price: 75.00 };
    case "easy-19":
      return { plan: "19GB", price: 45.00 };
    default:
      return null;
  }
};
