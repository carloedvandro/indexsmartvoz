
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
        <h3 className="text-lg font-bold text-white">Actual Cost</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <CircularProgress 
            percentage={salesData.performance}
            size={240}
            strokeWidth={16}
            circleOneStroke="#3b3f4b"
            circleTwoStroke="url(#performanceGradient)"
            isGauge={true}
          >
            <svg className="w-full h-full absolute" style={{ top: 0, left: 0 }}>
              <defs>
                <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="33%" stopColor="#84cc16" />
                  <stop offset="66%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
            {/* Labels inside the circular progress */}
            <div className="relative">
              <div className="absolute top-[-5px] left-[-30px] text-sm text-gray-300">0k</div>
              <div className="absolute top-[-35px] left-[-20px] text-sm text-gray-300">20k</div>
              <div className="absolute top-[-55px] left-[20px] text-sm text-gray-300">40k</div>
              <div className="absolute top-[-55px] right-[20px] text-sm text-gray-300">60k</div>
              <div className="absolute top-[-35px] right-[-20px] text-sm text-gray-300">80k</div>
              <div className="absolute top-[-5px] right-[-40px] text-sm text-gray-300">100k</div>
            </div>
          </CircularProgress>
        </div>
        
        <div className="mt-8 w-full">
          <div className="flex justify-center">
            <p className="text-2xl font-bold">{formatCurrency(salesData.actualSales)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
