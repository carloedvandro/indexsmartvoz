

export const internetOptions = [
  { value: "110GB", label: "Smartvoz 110GB + Minutos ilimitados", price: 109.99 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 119.99 },
  { value: "130GB", label: "Smartvoz 130GB + Minutos ilimitados", price: 129.99 },
  { value: "19GB", label: "Easy 19GB + Cashback R$10,00", price: 45.00 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-110":
      return { plan: "110GB", price: 109.99 };
    case "smartvoz-120":
      return { plan: "120GB", price: 119.99 };
    case "smartvoz-130":
      return { plan: "130GB", price: 129.99 };
    case "easy-19":
      return { plan: "19GB", price: 45.00 };
    default:
      return null;
  }
};
