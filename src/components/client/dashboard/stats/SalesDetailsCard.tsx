
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
        <p className="text-sm font-medium">{payload[0].payload.fullName}</p>
        <p className="text-sm">{payload[0].value} vendas</p>
      </div>
    );
  }
  return null;
};

export function SalesDetailsCard() {
  const [selectedPlanValue, setSelectedPlanValue] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const pieData = [
    { name: "START 6", fullName: "START 6 *GESIA", value: 300, color: "#8425af" },
    { name: "START 8", fullName: "START 8 *GESIA", value: 200, color: "#33C3F0" }
  ];
  
  const handleColorClick = (value: number) => {
    setSelectedPlanValue(prevValue => prevValue === value ? null : value);
    const audio = new Audio('/beep.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-[400px] h-[250px] relative flex items-center justify-center -mt-[2px] ${isMobile ? "mt-2" : ""}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-in-out"
                cursor="pointer"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{
                      filter: "drop-shadow(0px 4px 8px rgba(95, 8, 137, 0.15))",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium"
                fill="#4B5563"
              >
                Vendas do Mês
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
          <div className="space-y-2 mt-[12px]">
            <p className="text-sm font-medium text-gray-600 pt-[4px]">Planos mais vendidos</p>
            <div className="grid gap-[9px]">
              {pieData.map((plan, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 cursor-pointer hover:opacity-80 transition-all duration-300"
                    style={{ 
                      backgroundColor: plan.color,
                      transform: selectedPlanValue === plan.value ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: selectedPlanValue === plan.value ? `0 0 10px ${plan.color}` : 'none'
                    }}
                    onClick={() => handleColorClick(plan.value)}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 pt-[4px]">{plan.fullName}</p>
                    {selectedPlanValue === plan.value && (
                      <p className="text-sm font-medium mt-1 pt-[4px]" style={{ color: plan.color }}>
                        Vendas do mês: {plan.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
