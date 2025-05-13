
export const internetOptions = [
  { value: "100GB", label: "Smartvoz 100GB + Minutos ilimitados", price: 119.99 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 129.99 },
  { value: "140GB", label: "Smartvoz 140GB + Minutos ilimitados", price: 139.99 },
  { value: "160GB", label: "Smartvoz 160GB + Minutos ilimitados", price: 159.99 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-100":
      return { plan: "100GB", price: 119.99 };
    case "smartvoz-120":
      return { plan: "120GB", price: 129.99 };
    case "smartvoz-140":
      return { plan: "140GB", price: 139.99 };
    case "smartvoz-160":
      return { plan: "160GB", price: 159.99 };
    default:
      return null;
  }
};
