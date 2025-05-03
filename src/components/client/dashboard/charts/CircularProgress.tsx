
import React from 'react';

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  circleOneStroke?: string;
  circleTwoStroke?: string;
  children?: React.ReactNode;
  startAngle?: number;
  endAngle?: number;
  value?: number;
  maxValue?: number;
  showTicks?: boolean;
  showLabels?: boolean;
  gaugeType?: 'donut' | 'gauge';
  colorGradient?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 75,
  size = 190,
  strokeWidth = 25,
  circleOneStroke = '#33C3F0',
  circleTwoStroke = '#8425af',
  children,
  startAngle = 0,
  endAngle = 360,
  value = 0,
  maxValue = 100,
  showTicks = false,
  showLabels = false,
  gaugeType = 'donut',
  colorGradient = false,
}) => {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Convert degrees to radians for the SVG arc
  const startAngleRad = (startAngle - 90) * (Math.PI / 180);
  const endAngleRad = (endAngle - 90) * (Math.PI / 180);
  
  const x1 = center + radius * Math.cos(startAngleRad);
  const y1 = center + radius * Math.sin(startAngleRad);
  const x2 = center + radius * Math.cos(endAngleRad);
  const y2 = center + radius * Math.sin(endAngleRad);
  
  // Calculate path for the first half (circleOneStroke color)
  const firstHalfPercentage = 50; // Always 50% for the circleOneStroke
  const firstHalfOffset = circumference - (firstHalfPercentage / 100) * circumference;
  
  // Calculate path for the second half (circleTwoStroke color)
  const secondHalfPercentage = 50; // Always 50% for the circleTwoStroke
  const secondHalfOffset = circumference - (secondHalfPercentage / 100) * circumference;

  // Determine if we should use a full circle or an arc
  const useFullCircle = endAngle - startAngle >= 360;

  // Calculate needle rotation based on value
  const needleAngle = startAngle + ((value / maxValue) * (endAngle - startAngle));
  const needleRad = (needleAngle - 90) * (Math.PI / 180);
  const needleLength = radius - 10;
  const needleCenterRadius = 10;
  const needleX = center + needleLength * Math.cos(needleRad);
  const needleY = center + needleLength * Math.sin(needleRad);
  
  // Function to generate tick marks for gauge
  const generateTicks = () => {
    const ticks = [];
    const tickCount = 10;
    const angleRange = endAngle - startAngle;
    
    for (let i = 0; i <= tickCount; i++) {
      const tickAngle = startAngle + (i * angleRange / tickCount);
      const tickRad = (tickAngle - 90) * (Math.PI / 180);
      const outerX = center + (radius + 5) * Math.cos(tickRad);
      const outerY = center + (radius + 5) * Math.sin(tickRad);
      const innerX = center + (radius - 5) * Math.cos(tickRad);
      const innerY = center + (radius - 5) * Math.sin(tickRad);
      
      ticks.push(
        <line 
          key={`tick-${i}`}
          x1={innerX} 
          y1={innerY} 
          x2={outerX} 
          y2={outerY} 
          stroke="#fff" 
          strokeWidth="2"
        />
      );
    }
    return ticks;
  };

  // Function to generate labels for gauge
  const generateLabels = () => {
    const labels = ['0k', '20k', '40k', '60k', '80k', '100k'];
    const labelPositions = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    
    return labels.map((label, i) => {
      const labelAngle = startAngle + (labelPositions[i] * (endAngle - startAngle));
      const labelRad = (labelAngle - 90) * (Math.PI / 180);
      const labelRadius = radius + 20;
      const x = center + labelRadius * Math.cos(labelRad);
      const y = center + labelRadius * Math.sin(labelRad);
      
      return (
        <text
          key={`label-${i}`}
          x={x}
          y={y}
          fill="#fff"
          fontSize="12"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      );
    });
  };

  const renderGradientPath = () => {
    // Define the arc path for the gauge
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const sweepFlag = 1; // Always clockwise
    
    return (
      <>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1ECB43" />
            <stop offset="30%" stopColor="#4ECB1E" />
            <stop offset="50%" stopColor="#CBBD1E" />
            <stop offset="70%" stopColor="#CB901E" />
            <stop offset="100%" stopColor="#CB331E" />
          </linearGradient>
        </defs>
        <path
          d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </>
    );
  };
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {gaugeType === 'donut' ? (
          // Draw split circle with two halves for donut chart
          <>
            <circle
              stroke={circleOneStroke}
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference / 2} ${circumference / 2}`}
              strokeDashoffset={0}
              transform={`rotate(-90 ${center} ${center})`}
            />
            <circle
              stroke={circleTwoStroke}
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference / 2} ${circumference / 2}`}
              strokeDashoffset={circumference / 2}
              transform={`rotate(90 ${center} ${center})`}
            />
          </>
        ) : (
          // Draw gauge chart
          <>
            {colorGradient ? (
              renderGradientPath()
            ) : (
              <path
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`}
                fill="none"
                stroke={circleOneStroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
            
            {/* Draw tick marks if enabled */}
            {showTicks && generateTicks()}
            
            {/* Draw labels if enabled */}
            {showLabels && generateLabels()}
            
            {/* Draw needle */}
            <line
              x1={center}
              y1={center}
              x2={needleX}
              y2={needleY}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Draw needle center circle */}
            <circle
              cx={center}
              cy={center}
              r={needleCenterRadius}
              fill="white"
              stroke="#333"
              strokeWidth="1"
            />
          </>
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
