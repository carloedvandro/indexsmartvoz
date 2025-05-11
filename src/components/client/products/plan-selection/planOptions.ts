
export const internetOptions = [
  { value: "100GB", label: "Smartvoz 100GB + Minutos ilimitados", price: 114.99 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 124.99 },
  { value: "140GB", label: "Smartvoz 140GB + Minutos ilimitados", price: 154.99 },
  { value: "160GB", label: "Smartvoz 160GB + Minutos ilimitados", price: 184.99 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-100":
      return { plan: "100GB", price: 114.99 };
    case "smartvoz-120":
      return { plan: "120GB", price: 124.99 };
    case "smartvoz-140":
      return { plan: "140GB", price: 154.99 };
    case "smartvoz-160":
      return { plan: "160GB", price: 184.99 };
    default:
      return null;
  }
};
