
export const internetOptions = [
  { value: "100GB", label: "Smartvoz 100GB + Minutos ilimitados", price: 104.99 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 124.99 },
  { value: "400GB", label: "Smartvoz 400GB + Minutos ilimitados", price: 244.99 },
  { value: "19GB", label: "Easy 19GB + Cashback R$10,00", price: 45.00 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-100":
      return { plan: "100GB", price: 104.99 };
    case "smartvoz-120":
      return { plan: "120GB", price: 124.99 };
    case "smartvoz-400":
      return { plan: "400GB", price: 244.99 };
    case "easy-19":
      return { plan: "19GB", price: 45.00 };
    default:
      return null;
  }
};
