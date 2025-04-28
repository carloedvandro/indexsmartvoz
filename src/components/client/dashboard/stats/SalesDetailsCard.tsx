import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
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
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; data: any } | null>(null);
  
  const pieData = [
    { name: "110GB", fullName: "Plano Smartvoz 110GB + Minutos Ilimt.", value: 300, color: "#8425af" },
    { name: "120GB", fullName: "Plano Smartvoz 120GB + Minutos Ilimt.", value: 250, color: "#33C3F0" },
    { name: "130GB", fullName: "Plano Smartvoz 130GB + Minutos Ilimt.", value: 200, color: "#4CAF50" },
    { name: "140GB", fullName: "Plano Smartvoz 140GB + Minutos Ilimt.", value: 150, color: "#FFC107" }
  ];

  const onButtonClick = (index: number, event: React.MouseEvent) => {
    setActiveButton(index === activeButton ? null : index);
    setActiveIndex(index === activeIndex ? null : index);
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipData({
      x: rect.x + window.scrollX + rect.width + 10,
      y: rect.y + window.scrollY,
      data: pieData[index]
    });
    setShowTooltip(index === activeIndex ? false : true);
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
                startAngle={90}
                endAngle={-270}
                stroke="none"
                strokeWidth={0}
                style={{ outline: 'none', pointerEvents: 'none' }}
              >
                {pieData.map((entry, index) => {
                  const isActive = index === activeIndex;
                  const scale = isActive ? 1.1 : 1;
                  const zIndex = isActive ? 10 : 1;
                  const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="none"
                      style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center',
                        transition: 'all 0.3s ease-in-out',
                        zIndex: zIndex,
                        opacity: opacity,
                        filter: isActive ? 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))' : 'none',
                        outline: 'none',
                        pointerEvents: 'none'
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
          <div className="space-y-2 mt-[12px]">
            <p className="text-sm font-medium text-gray-600 pt-[4px]">Planos mais vendidos</p>
            <div className="grid gap-[9px]">
              {pieData.map((plan, index) => (
                <div 
                  key={index} 
                  className="flex items-center relative"
                >
                  <div 
                    className={`w-3 h-3 rounded-full mr-2 cursor-pointer transition-all duration-300 ${activeButton === index ? 'scale-125 shadow-lg' : ''}`}
                    style={{ 
                      backgroundColor: plan.color,
                      transform: activeButton === index ? 'scale(1.25)' : 'scale(1)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: activeButton === index ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                    onClick={(e) => onButtonClick(index, e)}
                  />
                  <div className="flex-1">
                    <p className={`text-sm text-gray-600 pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
                      {plan.fullName}
                    </p>
                  </div>
                  {showTooltip && tooltipData && activeButton === index && (
                    <div 
                      className="absolute left-6 -top-1 bg-white p-2 rounded-md shadow-lg border border-gray-200 z-50"
                      style={{
                        position: 'absolute',
                        left: '1.5rem',
                        top: '-0.25rem'
                      }}
                    >
                      <p className="text-sm font-medium">{plan.fullName}</p>
                      <p className="text-sm">{plan.value} vendas</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
