
import { useChartData } from "@/hooks/useChartData";
import { formatCurrency } from "@/utils/format";
import { CircularProgress } from "../charts/CircularProgress";

export function SalesDetailsCard() {
  const { salesData } = useChartData();
  
  // Use the total sales amount from the sales data
  const totalSalesAmount = salesData.totalAmount;

  return (
    <div className="h-[550px] bg-gray-800 rounded-lg p-6">
      <div className="flex items-start mb-6">
        <h3 className="text-lg font-bold text-white">Actual Cost</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[420px] h-[300px] relative flex items-center justify-center">
          <CircularProgress
            size={250}
            strokeWidth={25}
            startAngle={180}
            endAngle={360}
            value={68494.50}
            maxValue={100000}
            showTicks={true}
            showLabels={true}
            gaugeType="gauge"
            colorGradient={true}
          />
        </div>
      </div>
    </div>
  );
}
