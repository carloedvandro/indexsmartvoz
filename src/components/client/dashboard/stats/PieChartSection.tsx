
import { PieChart, Pie, Cell, ResponsiveContainer, Text, Label } from "recharts";
import { formatCurrency } from "@/utils/format";
import { SalesDataItem } from "./types";

interface PieChartSectionProps {
  pieData: SalesDataItem[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export function PieChartSection({ pieData, activeIndex, setActiveIndex }: PieChartSectionProps) {
  const totalSalesAmount = pieData.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);
  
  // Get forward offset for the active slice
  const getPopOutOffset = (index: number) => {
    if (index !== activeIndex) return { z: 0 };
    
    // Pop the slice forward instead of radially
    return { z: 25 };
  };

  // Calculate total value for percentage calculation
  const totalValue = pieData.reduce((sum, entry) => sum + entry.value, 0);

  // Custom label for pie slices showing percentage with custom values
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, midAngle, index } = props;
    
    // Custom percentages instead of calculated ones (odd and even values)
    const customPercentages = [9, 17, 19, 24, 31];
    const percent = customPercentages[index] || Math.round((pieData[index].value / totalValue) * 100);
    
    // Skip very small slices (less than 5%)
    if (percent < 5) return null;
    
    // Calculate the position of the text
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#FFFFFF"
        textAnchor="middle" 
        dominantBaseline="middle"
        style={{ 
          fontWeight: "bold",
          fontSize: "14px",
          textShadow: "0px 0px 3px rgba(0,0,0,0.5)"
        }}
      >
        {`${percent}%`}
      </text>
    );
  };

  return (
    <div className="w-full max-w-[420px] h-[300px] relative flex items-center justify-center -mt-[7px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {pieData.map((entry, index) => (
              <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={entry.gradientColor || entry.color} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
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
            label={renderCustomizedLabel}
            labelLine={false}
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
                  fill={`url(#colorGradient-${index})`}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  style={{
                    transform: `translateZ(${offset.z}px) scale(${scale})`,
                    transformOrigin: 'center center',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    zIndex: zIndex,
                    opacity: opacity,
                    filter: isActive ? 'drop-shadow(0px 10px 18px rgba(0, 0, 0, 0.45))' : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
                    outline: 'none',
                  }}
                />
              );
            })}
          </Pie>
          
          {/* Center text showing "Vendas do Mês" */}
          <Text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              fill: "#000000"
            }}
          >
            Vendas do Mês
          </Text>
          
          {/* Center text showing the total amount */}
          <Text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "16px",
              fontWeight: "700",
              fill: "#000000"
            }}
          >
            {formatCurrency(totalSalesAmount)}
          </Text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
