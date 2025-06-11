
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { formatCurrency } from "@/utils/format";

export function BonificationCard() {
  // Dados dos planos com cashback
  const plansWithCashback = [
    { name: "Smartvoz 80GB", cashback: 30.00 },
    { name: "Smartvoz 100GB", cashback: 40.00 },
    { name: "Smartvoz 120GB", cashback: 50.00 },
    { name: "Smartvoz 140GB", cashback: 60.00 },
  ];

  // Calcular total de cashback disponível
  const totalCashback = plansWithCashback.reduce((acc, plan) => acc + plan.cashback, 0);

  return (
    <Card className="p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Cashback</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center mt-4 mb-4">
        <div className="p-2 bg-green-100 rounded-md">
          <Sparkles className="h-5 w-5 text-green-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-600">Total Cashback Disponível</p>
          <p className="text-xl font-bold text-green-500">{formatCurrency(totalCashback)}</p>
        </div>
      </div>

      <div className="space-y-2 border-t pt-3">
        <p className="text-xs font-medium text-gray-500 uppercase">Cashback por Plano</p>
        {plansWithCashback.map((plan, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-600">{plan.name}</span>
            <span className="text-sm font-semibold text-green-600">
              {formatCurrency(plan.cashback)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
