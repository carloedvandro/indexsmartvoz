
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

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
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const pieData = [
    { name: "110GB", fullName: "Plano Smartvoz 110GB + Minutos Ilimt.", value: 300, color: "#9b87f5" },
    { name: "120GB", fullName: "Plano Smartvoz 120GB + Minutos Ilimt.", value: 250, color: "#1EAEDB" },
    { name: "130GB", fullName: "Plano Smartvoz 130GB + Minutos Ilimt.", value: 200, color: "#D6BCFA" },
    { name: "140GB", fullName: "Plano Smartvoz 140GB + Minutos Ilimt.", value: 150, color: "#F1F0FB" }
  ];

  const onPieClick = (data: any, index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
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
                onClick={onPieClick}
                cursor="pointer"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                strokeWidth={0}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="none"
                    style={{
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                      filter: activeIndex === index ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' : 'none',
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.5,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
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
                    className="w-3 h-3 rounded-full mr-2 hover:opacity-80 transition-all duration-300"
                    style={{ backgroundColor: plan.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 pt-[4px]">{plan.fullName}</p>
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

