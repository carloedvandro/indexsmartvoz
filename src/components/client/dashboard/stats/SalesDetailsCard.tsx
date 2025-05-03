
import { useChartData } from "@/hooks/useChartData";
import { CircularProgress } from "../charts/CircularProgress";
import { formatCurrency } from "@/utils/format";

export function SalesDetailsCard() {
  const { salesData } = useChartData();
  const primaryColor = '#33C3F0'; // Light blue color
  const secondaryColor = '#8425af'; // Purple color
  
  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center justify-center h-[350px]">
        <CircularProgress 
          percentage={salesData.distribution.primarySegment} 
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          strokeWidth={28}
          size={220}
        >
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Vendas do Mês</p>
            <p className="text-2xl font-bold">{formatCurrency(salesData.totalSales)}</p>
          </div>
        </CircularProgress>
      </div>
    </div>
  );
}
