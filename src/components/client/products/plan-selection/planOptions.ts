
export const internetOptions = [
  { value: "100GB", label: "100GB", price: 99.99 },
  { value: "120GB", label: "120GB", price: 119.99 },
  { value: "140GB", label: "140GB", price: 139.99 }
];

export const mapUrlPlanToInternet = (planIdFromUrl: string | null): { plan: string, price: number } | null => {
  if (!planIdFromUrl) return null;
  
  switch (planIdFromUrl) {
    case "smartvoz-100":
      return { plan: "100GB", price: 99.99 };
    case "smartvoz-120":
      return { plan: "120GB", price: 119.99 };
    case "smartvoz-140":
      return { plan: "140GB", price: 139.99 };
    default:
      return null;
  }
};

export const mapPlanIdToInternet = (planId: string) => {
  const planMap: { [key: string]: { plan: string; price: number } } = {
    // Map plan IDs to internet options
    "plano-100gb": { plan: "100GB", price: 99.99 },
    "plano-120gb": { plan: "120GB", price: 119.99 },
    "plano-140gb": { plan: "140GB", price: 139.99 }
  };
  
  return planMap[planId] || null;
};

export const mapPlanValueToInternet = (value: number) => {
  console.log('🔍 Mapeando valor:', value);
  
  // Mapear os valores reais que vêm do localStorage
  const valueMap: { [key: number]: string } = {
    // Valores dos planos reais
    99.99: "100GB",
    119.99: "120GB",
    139.99: "140GB"
  };
  
  const result = valueMap[value] || null;
  console.log('🔍 Resultado do mapeamento:', result);
  return result;
};

// Função para obter o preço real de um plano do banco de dados
export const getPlanPriceFromDatabase = (plansData: any[], idPlan: string): number => {

  if (!plansData || plansData.length === 0) return 0;
  
  const matchingPlan = plansData.find(plan => plan.id == idPlan);
  
  return matchingPlan ? matchingPlan.value : 0;
};

// Função para obter o nome do plano COM o GB incluído
export const getPlanName = (gb: string) => {
  switch (gb) {
    case "100GB":
      return "Plano Prime 100GB";
    case "120GB":
      return "Plano Premium 120GB";
    case "140GB":
      return "Plano Gold 140GB";
    default:
      return "Plano Smartvoz";
  }
};
