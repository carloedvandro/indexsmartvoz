
import { AreaChart, CreditCard, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";

export function FinancialCards() {
  // These would typically come from an API call in a real app
  const availableBalance = 5000.01;
  const totalEarnings = 42576.22;
  const forecastBonus = 0.00;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-6">
      {/* Saldo Disponível Card */}
      <Link 
        to="/client/financial"
        className="bg-green-500 rounded-xl shadow-sm p-4 hover:bg-green-600 transition-colors"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-xl font-bold text-white">{formatCurrency(availableBalance)}</span>
            <span className="text-sm text-white">Saldo Disponível</span>
          </div>
        </div>
      </Link>

      {/* Total de Adesão Pagos Card */}
      <Link 
        to="/client/financial" 
        className="bg-yellow-400 rounded-xl shadow-sm p-4 hover:bg-yellow-500 transition-colors"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-center mb-2">
            <AreaChart className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-xl font-bold text-white">{formatCurrency(totalEarnings)}</span>
            <span className="text-sm text-white">Ganhos até hoje</span>
          </div>
        </div>
      </Link>

      {/* Previsão de Ganhos Card */}
      <Link 
        to="/client/earnings-forecast" 
        className="bg-cyan-500 rounded-xl shadow-sm p-4 hover:bg-cyan-600 transition-colors"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-center mb-2">
            <AreaChart className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-xl font-bold text-white">{formatCurrency(forecastBonus)}</span>
            <span className="text-sm text-white">Previsão de Ganhos</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
