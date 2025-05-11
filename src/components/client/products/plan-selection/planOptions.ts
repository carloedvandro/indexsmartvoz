
export const internetOptions = [
  { value: "2GB", label: "Teste a Tegg - 2GB", price: 9.99 },
  { value: "100GB", label: "Smartvoz 100GB + Minutos ilimitados", price: 104.99 },
  { value: "120GB", label: "Smartvoz 120GB + Minutos ilimitados", price: 114.99 },
  { value: "140GB", label: "Smartvoz 140GB + Minutos ilimitados", price: 124.99 },
  { value: "160GB", label: "Smartvoz 160GB + Minutos ilimitados", price: 154.99 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "teste-tegg":
      return { plan: "2GB", price: 9.99 };
    case "basic":
      return { plan: "100GB", price: 104.99 };
    case "start":
      return { plan: "120GB", price: 114.99 };
    case "gold":
      return { plan: "140GB", price: 124.99 };
    case "plus":
      return { plan: "160GB", price: 154.99 };
    default:
      return null;
  }
};
