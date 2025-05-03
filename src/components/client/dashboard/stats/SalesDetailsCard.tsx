
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency } from "@/utils/format";
import { CircularProgress } from "../charts/CircularProgress";
import { useChartData } from "@/hooks/useChartData";
import { Card } from "@/components/ui/card";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const { salesData } = useChartData();
  
  return (
    <Card className="p-6 shadow-sm h-[550px] w-full border-0 rounded-xl shadow-lg bg-[#1A1F2C] text-white">
      <div className="flex items-start mb-4">
        <h3 className="text-lg font-bold text-white">Project Cost Performance</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <CircularProgress 
            percentage={salesData.performance}
            size={240}
            strokeWidth={20}
            circleOneStroke="#3b3f4b"
            circleTwoStroke="url(#performanceGradient)"
            isGauge={true}
          >
            <svg className="w-full h-full absolute" style={{ top: 0, left: 0 }}>
              <defs>
                <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
            {/* Labels inside the circular progress */}
            <div className="relative -top-5">
              <div className="absolute top-[-30px] left-[-10px] text-xs text-gray-300">0k</div>
              <div className="absolute top-[-60px] left-[-12px] text-xs text-gray-300">20k</div>
              <div className="absolute top-[-75px] left-[20px] text-xs text-gray-300">40k</div>
              <div className="absolute top-[-75px] right-[20px] text-xs text-gray-300">60k</div>
              <div className="absolute top-[-60px] right-[-12px] text-xs text-gray-300">80k</div>
              <div className="absolute top-[-30px] right-[-20px] text-xs text-gray-300">100k</div>
            </div>
          </CircularProgress>
        </div>
        
        <div className="mt-8 w-full">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-400 mb-1">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(salesData.targetSales)}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-400 mb-1">Actual Cost</p>
              <p className="text-2xl font-bold">{formatCurrency(salesData.actualSales)}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
