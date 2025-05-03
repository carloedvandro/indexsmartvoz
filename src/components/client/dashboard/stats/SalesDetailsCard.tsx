
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
        <p className="text-sm font-medium">{payload[0].payload.fullName}</p>
        <p className="text-sm">{payload[0].value} vendas</p>
        <p className="text-sm font-medium">{formatCurrency(payload[0].payload.totalAmount)}</p>
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
    { 
      name: "110GB", 
      fullName: "Plano Smartvoz 110GB + Minutos ilimitados", 
      value: 300, 
      price: 119.99,
      totalAmount: 300 * 119.99,
      color: "#9b87f5" 
    },
    { 
      name: "120GB", 
      fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
      value: 250, 
      price: 129.99,
      totalAmount: 250 * 129.99,
      color: "#33C3F0" 
    },
    { 
      name: "130GB", 
      fullName: "Plano Smartvoz 130GB + Minutos ilimitados", 
      value: 200, 
      price: 139.99,
      totalAmount: 200 * 139.99,
      color: "#8B5CF6" 
    },
    { 
      name: "140GB", 
      fullName: "Plano Smartvoz 140GB + Minutos ilimitados", 
      value: 150, 
      price: 149.99,
      totalAmount: 150 * 149.99,
      color: "#0EA5E9" 
    },
    { 
      name: "150GB", 
      fullName: "Plano Smartvoz 150GB + Minutos ilimitados", 
      value: 100, 
      price: 159.99,
      totalAmount: 100 * 159.99,
      color: "#F97316" 
    }
  ];

  const totalSalesAmount = pieData.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);

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

  // Calculate start and end angles for each slice
  const getSliceAngles = (index: number) => {
    const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
    const startAngle = 90; // Top position (in degrees)
    
    // Calculate the start angle for the specific slice
    let currentStartAngle = startAngle;
    for (let i = 0; i < index; i++) {
      currentStartAngle -= (pieData[i].value / total) * 360;
    }
    
    // Calculate the end angle for the specific slice
    const sliceAngle = (pieData[index].value / total) * 360;
    const endAngle = currentStartAngle - sliceAngle;
    
    // Calculate the middle angle of the slice (for the pop-out direction)
    const midAngle = (currentStartAngle + endAngle) / 2;
    
    return {
      startAngle: currentStartAngle,
      endAngle: endAngle,
      midAngle: midAngle
    };
  };

  // Calculate the offset position for the active slice
  const getPopOutOffset = (index: number) => {
    if (index !== activeIndex) return { x: 0, y: 0 };
    
    // Get the middle angle of the slice in radians
    const { midAngle } = getSliceAngles(index);
    const midAngleRad = (midAngle * Math.PI) / 180;
    
    // Distance to pop out
    const distance = 10;
    
    // Calculate the offset using the correct direction
    return {
      x: Math.cos(midAngleRad) * distance,
      y: Math.sin(midAngleRad) * distance
    };
  };

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-[420px] h-[300px] relative flex items-center justify-center -mt-[2px] ${isMobile ? "mt-2" : ""}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={75}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-in-out"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                strokeWidth={0}
                style={{ 
                  filter: 'drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.25))',
                  transform: 'perspective(1200px) rotateX(20deg)',
                }}
              >
                {pieData.map((entry, index) => {
                  const isActive = index === activeIndex;
                  const scale = isActive ? 1.1 : 1;
                  const zIndex = isActive ? 10 : 1;
                  const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
                  const offset = getPopOutOffset(index);
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: 'center center',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        zIndex: zIndex,
                        opacity: opacity,
                        filter: isActive ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.35))' : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
                        outline: 'none',
                      }}
                    />
                  );
                })}
              </Pie>
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium"
                fill="#000000"
              >
                Vendas do Mês
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-base font-bold"
                fill="#000000"
              >
                {formatCurrency(totalSalesAmount)}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
          <div className="space-y-2 mt-[12px]">
            <p className="text-sm font-medium text-black pt-[4px]">Planos mais vendidos</p>
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
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      boxShadow: activeButton === index ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                    }}
                    onClick={(e) => onButtonClick(index, e)}
                  />
                  <div className="flex-1">
                    <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100 font-medium' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
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
                      <p className="text-sm font-medium">{formatCurrency(plan.totalAmount)}</p>
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
