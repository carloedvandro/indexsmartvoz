
export const internetOptions = [
  { value: "2GB", label: "Teste a Tegg - 2GB", price: 9.99 },
  { value: "80GB", label: "BASIC - 80GB", price: 104.99 },
  { value: "100GB", label: "START - 100GB", price: 114.99 },
  { value: "100GB-smartvoz", label: "SMARTVOZ - 100GB", price: 119.99 },
  { value: "110GB", label: "SMARTVOZ - 110GB", price: 119.99 },
  { value: "120GB-smartvoz", label: "SMARTVOZ - 120GB", price: 124.99 },
  { value: "120GB", label: "GOLD - 120GB", price: 124.99 },
  { value: "140GB-smartvoz", label: "SMARTVOZ - 140GB", price: 139.99 },
  { value: "140GB", label: "PLUS - 140GB", price: 154.99 },
  { value: "160GB", label: "SMARTVOZ - 160GB", price: 159.99 },
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "teste-tegg":
      return { plan: "2GB", price: 9.99 };
    case "basic":
      return { plan: "80GB", price: 104.99 };
    case "start":
      return { plan: "100GB", price: 114.99 };
    case "smartvoz-100":
      return { plan: "100GB-smartvoz", price: 119.99 };
    case "smartvoz":
      return { plan: "110GB", price: 119.99 };
    case "smartvoz-120":
      return { plan: "120GB-smartvoz", price: 124.99 };
    case "gold":
      return { plan: "120GB", price: 124.99 };
    case "smartvoz-140":
      return { plan: "140GB-smartvoz", price: 139.99 };
    case "plus":
      return { plan: "140GB", price: 154.99 };
    case "smartvoz-160":
      return { plan: "160GB", price: 159.99 };
    default:
      return null;
  }
};
