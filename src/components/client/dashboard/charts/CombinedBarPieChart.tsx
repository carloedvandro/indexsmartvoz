
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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

export function CombinedBarPieChart({ data }: CombinedBarPieChartProps) {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Create pie data with percentage
  const pieData = data.map(item => ({
    ...item,
    percentage: Math.round((item.value / total) * 100)
  }));
  
  // Calculate positions for percentage labels and lines
  const getLabelPosition = (index: number, total: number) => {
    // Positions for the 4 segments (assuming the order is: 40%, 23%, 17%, 20%)
    const positions = [
      { x: 75, y: 10 },   // Top right (40%)
      { x: 85, y: 70 },   // Bottom right (23%)
      { x: 45, y: 85 },   // Bottom left (17%)
      { x: 10, y: 30 }    // Top left (20%)
    ];
    
    return positions[index % positions.length];
  };

  // Calculate line connector points
  const getConnectorPoints = (index: number) => {
    // Start points for connectors on the pie chart
    const piePoints = [
      { x: 58, y: 42 },   // 40% segment
      { x: 58, y: 65 },   // 23% segment
      { x: 42, y: 65 },   // 17% segment
      { x: 35, y: 45 }    // 20% segment
    ];
    
    const labelPosition = getLabelPosition(index, data.length);
    return {
      start: piePoints[index % piePoints.length],
      end: labelPosition
    };
  };
  
  return (
    <div className="w-full">
      <div className="h-[380px] relative">
        {/* 3D Pie Chart Base Shadow (to create depth illusion) */}
        <div 
          className="absolute rounded-full bg-gray-100" 
          style={{
            width: '70%',
            height: '20%',
            left: '15%',
            bottom: '5%',
            transform: 'rotateX(65deg)',
            filter: 'blur(15px)',
            opacity: 0.5,
            zIndex: 1
          }}
        />
        
        {/* Main Pie Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius="70%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`pie-cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: 'drop-shadow(2px 5px 3px rgba(0, 0, 0, 0.15))',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Percentage labels and connector lines */}
        {pieData.map((entry, index) => {
          const labelPosition = getLabelPosition(index, pieData.length);
          const connector = getConnectorPoints(index);
          
          return (
            <React.Fragment key={`label-${index}`}>
              {/* Connector line */}
              <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                style={{ zIndex: 5 }}
              >
                <line
                  x1={`${connector.start.x}%`}
                  y1={`${connector.start.y}%`}
                  x2={`${connector.end.x}%`}
                  y2={`${connector.end.y}%`}
                  stroke={entry.color}
                  strokeWidth="1"
                />
              </svg>
              
              {/* Percentage label in circle */}
              <div 
                className="absolute flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 w-16 h-16"
                style={{
                  top: `${labelPosition.y}%`,
                  left: `${labelPosition.x}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <span className="text-xl font-bold text-gray-700">{entry.percentage}%</span>
              </div>
              
              {/* Label text */}
              <div
                className="absolute max-w-[150px] text-xs text-gray-600"
                style={{
                  top: `${labelPosition.y + (index % 2 === 0 ? -15 : 15)}%`,
                  left: `${labelPosition.x + (index === 0 || index === 3 ? -15 : 15)}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <p className="font-semibold">{entry.name}</p>
                <p>{formatCurrency(entry.price)}</p>
              </div>
            </React.Fragment>
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
