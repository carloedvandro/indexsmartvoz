
export const cardConfigs = {
  received: {
    title: "Recebidas",
    barColors: {
      primary: "bg-green-500", // Tom mais escuro para Pix
      secondary: "bg-green-300" // Tom mais claro para Boleto
    }
  },
  confirmed: {
    title: "Confirmadas", 
    barColors: {
      primary: "bg-blue-600", // Tom mais escuro para Pix
      secondary: "bg-blue-300" // Tom mais claro para Boleto
    }
  },
  awaiting: {
    title: "Aguardando pagamento",
    barColors: {
      primary: "bg-orange-600", // Tom mais escuro para Pix
      secondary: "bg-orange-300" // Tom mais claro para Boleto
    }
  },
  overdue: {
    title: "Vencidas",
    barColors: {
      primary: "bg-red-600", // Tom mais escuro para Pix
      secondary: "bg-red-300" // Tom mais claro para Boleto
    }
  }
};
