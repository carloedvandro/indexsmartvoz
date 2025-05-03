
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
      name: "100GB", 
      fullName: "Plano Smartvoz 100GB + Minutos ilimitados", 
      value: 300, 
      price: 119.99,
      totalAmount: 300 * 119.99,
      color: "#8e44ad",
      percentage: "30%" 
    },
    { 
      name: "120GB", 
      fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
      value: 250, 
      price: 129.99,
      totalAmount: 250 * 129.99,
      color: "#e67e22",
      percentage: "25%" 
    },
    {
      name: "150GB",
      fullName: "Plano Smartvoz 150GB + Minutos ilimitados",
      value: 200,
      price: 149.99,
      totalAmount: 200 * 149.99,
      color: "#e74c3c",
      percentage: "20%"
    },
    {
      name: "200GB",
      fullName: "Plano Smartvoz 200GB + Minutos ilimitados",
      value: 100,
      price: 179.99,
      totalAmount: 100 * 179.99,
      color: "#f1c40f",
      percentage: "10%"
    },
    {
      name: "Unlimited",
      fullName: "Plano Smartvoz Unlimited + Minutos ilimitados",
      value: 150,
      price: 199.99,
      totalAmount: 150 * 199.99,
      color: "#27ae60",
      percentage: "15%"
    },
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
                paddingAngle={4}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-in-out"
                startAngle={90}
                endAngle={-270}
                stroke="#ffffff"
                strokeWidth={3}
                style={{ 
                  filter: 'drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.15))',
                }}
              >
                {pieData.map((entry, index) => {
                  const isActive = index === activeIndex;
                  const scale = isActive ? 1.08 : 1;
                  const translateX = isActive ? Math.cos((90 - index * 72) * Math.PI / 180) * 10 : 0;
                  const translateY = isActive ? -Math.sin((90 - index * 72) * Math.PI / 180) * 10 : 0;
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      // Remove cornerRadius prop as it's not supported
                      style={{
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        transformOrigin: 'center center',
                        transition: 'all 0.4s ease-out',
                        filter: isActive ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3))' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => onButtonClick(index, e as unknown as React.MouseEvent)}
                    />
                  );
                })}
                
                {pieData.map((entry, index) => {
                  // Position percentage labels on the pie chart segments
                  const angle = 90 - (index * 360 / pieData.length) - (360 / pieData.length / 2);
                  const radius = 100;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = -Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <text
                      key={`percentage-${index}`}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#ffffff"
                      fontWeight="bold"
                      fontSize="14px"
                      pointerEvents="none"
                    >
                      {entry.percentage}
                    </text>
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
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: activeButton === index ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                    onClick={(e) => onButtonClick(index, e)}
                  />
                  <div className="flex-1">
                    <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
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
