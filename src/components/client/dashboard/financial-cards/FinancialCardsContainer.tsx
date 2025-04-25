
import { FinancialCard } from "./FinancialCard";

export function FinancialCardsContainer() {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      <FinancialCard 
        to="/client/financial"
        bgColor="bg-green-500"
        hoverColor="hover:bg-green-600"
        icon="dollar"
        amount={5000.01}
        label="Saldo Disponível"
      />
      <FinancialCard 
        to="/client/financial"
        bgColor="bg-amber-400"
        hoverColor="hover:bg-amber-500"
        icon="chart"
        amount={42576.22}
        label="Ganhos até hoje"
      />
      <FinancialCard 
        to="/client/financial"
        bgColor="bg-blue-500"
        hoverColor="hover:bg-blue-600"
        icon="trending"
        amount={0}
        label="Previsão de Ganhos"
      />
    </div>
  );
}
