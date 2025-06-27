export const internetOptions = [
  { value: "80GB", label: "80GB", price: 99.99 },
  { value: "100GB", label: "100GB", price: 119.99 },
  { value: "120GB", label: "120GB", price: 129.99 },
  { value: "140GB", label: "140GB", price: 144.99 }
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

export const mapPlanIdToInternet = (planId: string) => {
  const planMap: { [key: string]: { plan: string; price: number } } = {
    // Map plan IDs to internet options
    "plano-80gb": { plan: "80GB", price: 99.99 },
    "plano-100gb": { plan: "100GB", price: 119.99 },
    "plano-120gb": { plan: "120GB", price: 129.99 },
    "plano-140gb": { plan: "140GB", price: 144.99 }
  };
  
  return planMap[planId] || null;
};

export const mapPlanValueToInternet = (value: number) => {
  const valueMap: { [key: number]: string } = {
    99.99: "80GB",
    119.99: "100GB", 
    129.99: "120GB",
    144.99: "140GB"
  };
  
  return valueMap[value] || null;
};
