import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { TooltipProvider, Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SalesDetailsCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
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
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md z-[9999]">
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
    <Card className="p-6 shadow-sm h-[420px] w-full border-0 rounded-xl shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">Detalhe das Vendas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      <div className="md:flex items-center mt-[-60px]">
        <div className="w-full md:w-[40%] mb-4 md:mb-0">
          <div className="h-[300px] relative" style={{ zIndex: 10 }}>
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
                  cursor="pointer"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {pieData.map((entry, index) => {
                    const isActive = index === activeIndex;
                    const scale = isActive ? 1.15 : 1;
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        strokeWidth={isActive ? 2 : 0}
                        stroke={isActive ? "#6E59A5" : "none"}
                        style={{
                          filter: isActive ? "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" : "none",
                          transition: "all 0.3s ease-in-out",
                          transformOrigin: "center center",
                          transform: `scale(${scale})`,
                          zIndex: isActive ? 10 : 1,
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
                <Tooltip 
                  content={<CustomTooltip />} 
                  position={{ x: 0, y: 0 }}
                  wrapperStyle={{ 
                    zIndex: 9999, 
                    position: 'fixed', 
                    pointerEvents: 'auto',
                    visibility: 'visible',
                    top: 'auto',
                    left: 'auto'
                  }}
                  allowEscapeViewBox={{ x: true, y: true }}
                  offset={10}
                  cursor={{ stroke: 'none', strokeWidth: 0 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="w-full md:w-[60%] pl-0 md:pl-8 md:ml-4">
          <p className="text-sm font-medium text-gray-600">Valor total de vendas</p>
          <p className="text-lg font-bold text-purple-600 mb-4">{totalSales}</p>
          
          <p className="text-sm font-medium text-gray-600 mb-3">Planos mais vendidos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pieData.map((plan, index) => (
              <div key={index} className="flex items-center">
                <div className="min-w-3 h-3 rounded-full mr-2" style={{ backgroundColor: plan.color }}></div>
                <p className="text-xs text-gray-600 whitespace-normal">{plan.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
