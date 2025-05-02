
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

export const ExpenseDistributionCard = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const expenseData = [
    { name: "Marketing", value: 35, color: "#9b87f5" },
    { name: "Infraestrutura", value: 25, color: "#33C3F0" },
    { name: "Pessoal", value: 30, color: "#D6BCFA" },
    { name: "Outros", value: 10, color: "#E5E7EB" }
  ];
  
  // Enhanced tooltip with better positioning
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md z-[9999]">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm font-bold">{`${payload[0].value}%`}</p>
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
    <Card className="p-6 shadow-sm h-full w-full border-0 rounded-xl shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">Distribuição de Despesas</h3>
        {/* Removed the ellipsis button */}
      </div>
      
      <div className="flex flex-col">
        <div className="h-48 relative" style={{ zIndex: 10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-in-out"
                cursor="pointer"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {expenseData.map((entry, index) => {
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
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          {expenseData.map((expense, index) => (
            <div key={index} className="flex items-center">
              <div className="min-w-3 h-3 rounded-full mr-2" style={{ backgroundColor: expense.color }}></div>
              <p className="text-xs text-gray-600 whitespace-normal">{expense.name} <span className="font-bold">{expense.value}%</span></p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
