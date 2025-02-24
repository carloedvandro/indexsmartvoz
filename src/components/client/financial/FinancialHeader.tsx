
import { Receipt } from "lucide-react";

export function FinancialHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 px-6">
      <div className="h-full flex items-center">
        <div className="flex items-center gap-3">
          <Receipt className="w-6 h-6 text-gray-500" />
          <div className="flex flex-col">
            <h1 className="text-base text-gray-500 font-normal leading-tight">FINANCEIRO</h1>
            <h2 className="text-lg text-gray-900 font-medium">Resumo</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
