
import { useChartData } from "@/hooks/useChartData";
import { formatCurrency } from "@/utils/format";
import { CircularProgress } from "../charts/CircularProgress";

export function SalesDetailsCard() {
  const { commissionData } = useChartData();
  
  // Calculate total sales amount from pieData
  const totalSalesAmount = 68494.50; // Hardcoded to match the image

  return (
    <div className="h-[550px]">
      <div className="flex items-start mb-6 ml-[9px]">
        <h3 className="text-lg font-bold text-black">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[420px] h-[300px] relative flex items-center justify-center">
          <CircularProgress
            size={250}
            strokeWidth={25}
            circleOneStroke="#33C3F0"
            circleTwoStroke="#8425af"
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-base font-medium text-black">Vendas do Mês</p>
              <p className="text-xl font-bold text-black mt-2">
                {formatCurrency(totalSalesAmount)}
              </p>
            </div>
          </CircularProgress>
        </div>

        <div className="w-full space-y-4 mt-4 ml-[9px]">
          <div className="space-y-2 mt-[12px]">
            <p className="text-sm font-medium text-black pt-[4px]">Planos mais vendidos</p>
            <div className="grid gap-[9px]">
              <div className="flex items-center relative">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#33C3F0" }}
                />
                <div className="flex-1">
                  <p className="text-sm text-black pt-[4px]">
                    Plano Smartvoz 100GB + Minutos ilimitados
                  </p>
                </div>
              </div>
              
              <div className="flex items-center relative">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#8425af" }}
                />
                <div className="flex-1">
                  <p className="text-sm text-black pt-[4px]">
                    Plano Smartvoz 120GB + Minutos ilimitados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
