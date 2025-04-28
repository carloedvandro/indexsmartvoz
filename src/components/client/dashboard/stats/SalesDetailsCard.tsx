
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { useIsMobile } from "@/hooks/use-mobile";

export function SalesDetailsCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedPlanValue, setSelectedPlanValue] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  // Updated color palette to match image with proper blue gradient
  const pieData = [
    { name: "Plano Smartvoz <strong><span class='gradient-text'>110GB</span></strong> + Minutos ilimit.", value: 300, color: "#4842F5" },
    { name: "Plano Smartvoz <strong><span class='gradient-text'>120GB</span></strong> + Minutos ilimit.", value: 200, color: "#6C63FF" },
    { name: "Plano Smartvoz <strong><span class='gradient-text'>130GB</span></strong> + Minutos ilimit.", value: 150, color: "#A5A0FF" },
    { name: "Plano Smartvoz <strong><span class='gradient-text'>140GB</span></strong> + Minutos ilimit.", value: 100, color: "#E0E0FF" }
  ];
  
  const totalSales = "R$ 691.526,00";
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const handleColorClick = (value: number) => {
    setSelectedPlanValue(value);
  };

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-[400px] h-[250px] relative flex items-center justify-center ${isMobile ? "mt-2" : ""}`}>
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
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                cursor="pointer"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => {
                  const isActive = index === activeIndex;
                  const scale = isActive ? 1.05 : 1;
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={isActive ? "#4842F5" : "transparent"}
                      strokeWidth={isActive ? 2 : 0}
                      style={{
                        filter: isActive ? "drop-shadow(0px 4px 8px rgba(79, 70, 229, 0.25))" : "none",
                        transition: "all 0.3s ease",
                        transformOrigin: "center center",
                        transform: `scale(${scale})`,
                        zIndex: isActive ? 10 : 1,
                        outline: "none"
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
                className="text-sm font-medium"
                fill="#4B5563"
              >
                Vendas do Mês
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
          <div className="flex items-start gap-2 mt-4">
            <p className="text-sm text-gray-600">Valor total de vendas</p>
            <p className="text-lg font-bold" style={{ color: "#03de12" }}>{totalSales}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Planos mais vendidos</p>
            <div className="grid gap-[9px]">
              {pieData.map((plan, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: plan.color }}
                    onClick={() => handleColorClick(plan.value)}
                  />
                  <div className="flex-1">
                    <p 
                      className="text-sm text-gray-600" 
                      dangerouslySetInnerHTML={{ 
                        __html: plan.name 
                      }}
                    />
                    {selectedPlanValue === plan.value && (
                      <p className="text-sm font-medium mt-1" style={{ color: plan.color }}>
                        Vendas do mês: {formatCurrency(plan.value * 1000)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gradient-text {
          background: linear-gradient(
            135deg,
            #000000 0%,
            #000000 25%,
            #000000 50%,
            #000000 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: bold;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          animation: rainbow 8s linear infinite;
          background-size: 200% auto;
          font-size: 1.05em;
          margin-top: -1px;
          display: inline-block;
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
