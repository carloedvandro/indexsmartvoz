
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  value: number;
}

export const PieChartStats = ({ data, title, value }: PieChartStatsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Enhanced tooltip that won't get cut off
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md z-[9999]">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm font-bold">{`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Handlers for the 3D effect
  const handleMouseEnter = (_, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleClick = (_, index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="relative w-full h-full bg-white rounded-xl p-4 flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-gray-800">{value}%</span>
        <span className="text-sm text-gray-500 mt-1">{title}</span>
      </div>
      {/* Increased the max width to make the chart larger */}
      <div 
        className="w-full max-w-[450px] mx-auto" 
        style={{ 
          height: "100%",
          perspective: "1000px", // Add perspective for 3D effect
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ transform: activeIndex !== null ? "translateZ(20px)" : "translateZ(0)", transition: "transform 0.4s ease-out" }}>
            <defs>
              <linearGradient id="pieGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D6BCFA" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#D6BCFA" stopOpacity={0.1} />
              </linearGradient>
              <filter id="shadow-effect" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="95%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              animationDuration={800}
              animationEasing="ease-out"
              className={activeIndex !== null ? "transform-gpu" : ""}
              style={{
                filter: activeIndex !== null ? "url(#shadow-effect)" : "none",
                transition: "filter 0.3s ease-in-out",
              }}
            >
              {data.map((entry, index) => {
                const isActive = index === activeIndex;
                const scale = isActive ? 1.05 : 1;
                const translateZ = isActive ? 30 : 0;

                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80"
                    style={{
                      transform: `scale(${scale}) translateZ(${translateZ}px)`,
                      transformOrigin: 'center center',
                      transition: 'all 0.3s ease-in-out',
                      filter: isActive ? 'drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.25))' : 'none',
                      cursor: 'pointer',
                      outline: 'none'
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
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D6BCFA" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#D6BCFA" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <path
            d="M0 0 Q50 30 100 0"
            fill="url(#areaGradient)"
            className="w-full"
          />
        </svg>
      </div>
    </div>
  );
};
