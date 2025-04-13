
import { AreaChart, CreditCard, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";

export function FinancialCards() {
  // These would typically come from an API call in a real app
  const availableBalance = 5000.01;
  const totalEarnings = 42576.22;
  const forecastBonus = 3780.42;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-6">
      {/* Previsão de Bônus Card */}
      <Link 
        to="/client/earnings-forecast" 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 w-12 h-12 rounded-md flex items-center justify-center">
              <AreaChart className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">{formatCurrency(forecastBonus)}</span>
              <span className="text-xs text-gray-500 uppercase">Previsão de bônus</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">04/25</div>
        </div>
      </Link>

      {/* Total de Adesão Card */}
      <Link 
        to="/client/financial" 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 w-12 h-12 rounded-md flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">{formatCurrency(totalEarnings)}</span>
              <span className="text-xs text-gray-500 uppercase">Total de Adesão</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Saldo Disponível Card */}
      <Link 
        to="/client/financial"
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 w-12 h-12 rounded-md flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">{formatCurrency(availableBalance)}</span>
              <span className="text-xs text-gray-500 uppercase">Saldo disponível</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
