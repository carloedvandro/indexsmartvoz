
import { Card } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export function SalesDetailsCard() {
  // No futuro, esses dados viriam de uma API
  const totalSales = 0;
  const bestSellingPlans = [
    { name: "Outros Planos", color: "#9b87f5" }
  ];
  
  return (
    <Card className="p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Detalhe das Vendas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-start mt-4">
        <div className="w-1/2">
          <p className="text-2xl font-bold text-gray-800">R$ 0,00</p>
          <p className="text-sm text-gray-500">Vendas do Mês</p>
        </div>
        
        <div className="w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-md">
              <Receipt className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Valor total de vendas</p>
              <p className="text-sm font-semibold">R$ 0,00</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600 mb-3">Planos mais vendidos</p>
            {bestSellingPlans.map((plan, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: plan.color }}></div>
                <p className="text-sm text-gray-600">{plan.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
