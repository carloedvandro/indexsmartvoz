
export const internetOptions = [
  { value: "80GB", label: "Smartvoz 80GB + Minutos ilimitados", price: 84.99 },
  { value: "100GB", label: "Smartvoz 100GB + Minutos ilimitados", price: 104.99 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 124.99 },
  { value: "140GB", label: "Smartvoz Gold 140GB + Minutos ilimitados", price: 144.99 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-80":
      return { plan: "80GB", price: 84.99 };
    case "smartvoz-100":
      return { plan: "100GB", price: 104.99 };
    case "smartvoz-120":
      return { plan: "120GB", price: 124.99 };
    case "smartvoz-140":
      return { plan: "140GB", price: 144.99 };
    default:
      return null;
  }
};
