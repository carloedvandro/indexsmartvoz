import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SalesDetailsCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const pieData = [
    { name: "START 110GB + Minutos ilimit.", value: 300, color: "#9b87f5" },
    { name: "START 120GB + Minutos ilimit.", value: 200, color: "#33C3F0" },
    { name: "START 130GB + Minutos ilimit.", value: 150, color: "#D6BCFA" },
    { name: "Outros Planos", value: 100, color: "#E5E7EB" }
  ];
  
  const totalSales = "R$ 691.526,00";
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md z-50">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm font-bold">{`${payload[0].value} vendas`}</p>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="p-6 shadow-sm h-[467px] w-full rounded-xl bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-black">Detalhe das Vendas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-[300px] h-[180px] relative ${isMobile ? "mt-2" : ""}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-in-out"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                cursor="pointer"
              >
                {pieData.map((entry, index) => {
                  const isActive = index === activeIndex;
                  const scale = isActive ? 1.15 : 1;
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="none"
                      style={{
                        filter: isActive ? "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" : "none",
                        transition: "all 0.3s ease-in-out",
                        transformOrigin: "center center",
                        transform: `scale(${scale})`,
                        zIndex: isActive ? 10 : 1
                      }}
                    />
                  );
                })}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium"
                fill="#4B5563"
              >
                Vendas do Mês
              </text>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full space-y-4 -mt-[0.5px]">
          <div className="flex items-center gap-2 mt-4">
            <p className="text-sm text-gray-600">Valor total de vendas</p>
            <p className="text-lg font-bold text-purple-600">{totalSales}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Planos mais vendidos</p>
            <div className="grid gap-2">
              {pieData.map((plan, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: plan.color }}></div>
                  <p className="text-sm text-gray-600">{plan.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
