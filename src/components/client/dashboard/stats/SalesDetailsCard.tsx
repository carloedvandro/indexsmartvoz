
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/utils/format";
import { motion, AnimatePresence } from "framer-motion";

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
  const [rotation, setRotation] = useState(0);
  
  const pieData = [
    { 
      name: "100GB", 
      fullName: "Plano Smartvoz 100GB + Minutos ilimitados", 
      value: 300, 
      price: 119.99,
      totalAmount: 300 * 119.99,
      color: "#8425af" 
    },
    { 
      name: "120GB", 
      fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
      value: 250, 
      price: 129.99,
      totalAmount: 250 * 129.99,
      color: "#33C3F0" 
    }
  ];

  const totalSalesAmount = pieData.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);

  // Slowly rotate the chart
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

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
    <div className="pl-0 h-[550px] relative">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div 
          className={`w-full max-w-[420px] h-[300px] relative flex items-center justify-center -mt-[2px] ${isMobile ? "mt-2" : ""}`}
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d"
          }}
        >
          <div 
            className="w-full h-full absolute"
            style={{
              transform: `rotateY(${rotation * 0.05}deg) rotateX(${Math.sin(rotation / 20) * 5}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out"
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {pieData.map((entry, index) => (
                    <filter key={`shadow-${index}`} id={`shadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation={activeIndex === index ? 6 : 3} floodColor="#000" floodOpacity={activeIndex === index ? 0.3 : 0.2} />
                    </filter>
                  ))}
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9b5de5" />
                    <stop offset="100%" stopColor="#8425af" />
                  </linearGradient>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#45e3ff" />
                    <stop offset="100%" stopColor="#33C3F0" />
                  </linearGradient>
                </defs>
                <Pie
                  data={pieData}
                  innerRadius={90}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-in-out"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  strokeWidth={0}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {pieData.map((entry, index) => {
                    const isActive = index === activeIndex;
                    const scale = isActive ? 1.15 : 1;
                    const zIndex = isActive ? 10 : 1;
                    const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
                    const depth = isActive ? 30 : 0;
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "url(#purpleGradient)" : "url(#blueGradient)"}
                        stroke="#ffffff"
                        strokeWidth={1}
                        style={{
                          transform: `scale(${scale}) translateZ(${depth}px)`,
                          transformOrigin: 'center center',
                          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          zIndex: zIndex,
                          opacity: opacity,
                          filter: `url(#shadow-${index})`,
                          cursor: 'pointer'
                        }}
                      />
                    );
                  })}
                </Pie>
                <foreignObject x="50%" y="45%" width="1" height="1" style={{ overflow: 'visible' }}>
                  <div 
                    className="flex flex-col items-center justify-center"
                    style={{ 
                      transform: 'translate(-50%, -50%)',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <p className="text-sm font-medium text-gray-600">
                      Vendas do Mês
                    </p>
                    <p className="text-base font-bold text-black">
                      {formatCurrency(totalSalesAmount)}
                    </p>
                  </div>
                </foreignObject>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
          <div className="space-y-2 mt-[12px]">
            <p className="text-sm font-medium text-black pt-[4px]">Planos mais vendidos</p>
            <div className="grid gap-[9px] relative z-10">
              {pieData.map((plan, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div 
                    className={`w-3 h-3 rounded-full mr-2 cursor-pointer transition-all duration-300`}
                    style={{ 
                      background: index === 0 ? 'linear-gradient(to bottom right, #9b5de5, #8425af)' : 
                                             'linear-gradient(to bottom right, #45e3ff, #33C3F0)',
                      boxShadow: activeButton === index ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                    }}
                    onClick={(e) => onButtonClick(index, e)}
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                      scale: activeButton === index ? 1.25 : 1,
                    }}
                  />
                  <div className="flex-1">
                    <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100 font-medium' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
                      {plan.fullName}
                    </p>
                  </div>
                  <AnimatePresence>
                    {showTooltip && tooltipData && activeButton === index && (
                      <motion.div 
                        className="absolute left-6 -top-1 bg-white p-3 rounded-md shadow-lg border border-gray-200 z-50"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{
                          left: '1.5rem',
                          top: '-0.25rem',
                          transformOrigin: 'left center'
                        }}
                      >
                        <p className="text-sm font-medium">{plan.fullName}</p>
                        <p className="text-sm">{plan.value} vendas</p>
                        <p className="text-sm font-medium">{formatCurrency(plan.totalAmount)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add subtle background gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-50/30 to-transparent -z-10 rounded-b-xl"></div>
    </div>
  );
}
