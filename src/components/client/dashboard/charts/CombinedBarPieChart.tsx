
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { formatCurrency } from '@/utils/format';

interface DataItem {
  name: string;
  fullName: string;
  value: number;
  price: number;
  totalAmount: number;
  color: string;
}

interface CombinedBarPieChartProps {
  data: DataItem[];
}

const CustomBarTooltip = ({ active, payload }: any) => {
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

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
        <p className="text-sm font-medium">{payload[0].name} - {payload[0].payload.percentage}%</p>
        <p className="text-sm">{payload[0].value} vendas</p>
        <p className="text-sm font-medium">{formatCurrency(payload[0].payload.totalAmount)}</p>
      </div>
    );
  }
  return null;
};

export function CombinedBarPieChart({ data }: CombinedBarPieChartProps) {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Create pie data with percentage
  const pieData = data.map(item => ({
    ...item,
    percentage: Math.round((item.value / total) * 100)
  }));

  // Get highlighted item (for the arrow effect) - using the second item in the data
  const highlightedItem = data.length > 1 ? data[1] : data[0];
  
  return (
    <div className="w-full">
      {/* Bar chart section */}
      <div className="h-[200px] mb-12 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <XAxis dataKey="name" hide />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{
                    filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))',
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Text labels on bars */}
        <div className="absolute inset-0 pointer-events-none flex justify-around items-end pb-20">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="text-center text-white font-medium text-sm flex-1 px-2"
              style={{ 
                transform: `translateY(-${item.value * 0.3}px)`,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Connection arrow from bar to pie chart */}
      <div className="relative h-16 mx-auto w-full flex justify-center">
        <div 
          className="absolute h-16 w-1 bg-gradient-to-b from-transparent to-green-500"
          style={{ left: `calc(${(data.indexOf(highlightedItem) + 0.5) * (100 / data.length)}%)` }}
        ></div>
        <div 
          className="absolute bottom-0 w-12 h-12 flex items-center justify-center"
          style={{ 
            left: `calc(${(data.indexOf(highlightedItem) + 0.5) * (100 / data.length)}% - 24px)`,
          }}
        >
          <svg height="48" width="48" className="transform rotate-90">
            <polygon points="0,0 48,24 0,48" fill="#4ade80" />
          </svg>
        </div>
      </div>
      
      {/* Pie chart section */}
      <div className="h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`pie-cell-${index}`} 
                  fill={entry.color} 
                  style={{
                    filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.15))',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Percentage labels */}
        {pieData.map((entry, index) => {
          // Calculate position for labels
          const angle = 90 - 360 * (index / pieData.length);
          const radian = (angle * Math.PI) / 180;
          const x = 50 + (110 * Math.cos(radian));
          const y = 50 - (110 * Math.sin(radian));
          
          return (
            <div 
              key={`label-${index}`}
              className="absolute text-base font-bold"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {entry.percentage}%
            </div>
          );
        })}
      </div>
      
      {/* Legend below pie chart */}
      <div className="grid gap-2 mt-4 px-4">
        {pieData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm">{entry.fullName}</span>
            <span className="text-sm ml-auto">{formatCurrency(entry.totalAmount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
