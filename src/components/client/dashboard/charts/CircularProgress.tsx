
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
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {useFullCircle ? (
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
          // Draw partial arc for gauge chart
          <path
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`}
            fill="none"
            stroke={circleOneStroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
