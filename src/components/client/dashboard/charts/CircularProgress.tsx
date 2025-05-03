
import React from 'react';

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  circleOneStroke?: string;
  circleTwoStroke?: string;
  children?: React.ReactNode;
  isGauge?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 75,
  size = 190,
  strokeWidth = 15,
  circleOneStroke = '#e6e6e6',
  circleTwoStroke = '#22c55e',
  children,
  isGauge = true,
}) => {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  // For gauge style, we use only 75% of the circle (270 degrees)
  const gaugeCircumference = isGauge ? circumference * 0.75 : circumference;
  
  // Calculate the offset to show the correct percentage
  const offset = isGauge 
    ? gaugeCircumference - (percentage / 100) * gaugeCircumference 
    : circumference - (percentage / 100) * circumference;
  
  // For gauge style, we start at 135 degrees (bottom left)
  const startAngle = isGauge ? 135 : 0;
  const rotation = isGauge ? -startAngle : -90;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        className="transform" 
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {isGauge ? (
          // Gauge style uses only 270 degrees arc
          <>
            <path
              d={`M ${center} ${center} L ${center} ${strokeWidth / 2} A ${radius} ${radius} 0 1 1 ${center - radius} ${center} Z`}
              fill="none"
              stroke={circleOneStroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`rotate(135, ${center}, ${center})`}
              strokeDasharray={`${gaugeCircumference} ${circumference}`}
            />
            <path
              d={`M ${center} ${center} L ${center} ${strokeWidth / 2} A ${radius} ${radius} 0 1 1 ${center - radius} ${center} Z`}
              fill="none"
              stroke={circleTwoStroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`rotate(135, ${center}, ${center})`}
              strokeDasharray={`${gaugeCircumference - offset} ${circumference}`}
              strokeDashoffset="0"
            />
            {/* Needle */}
            <line
              x1={center}
              y1={center}
              x2={center}
              y2={strokeWidth * 1.5}
              stroke="white"
              strokeWidth={4}
              transform={`rotate(${135 + (percentage * 270 / 100)}, ${center}, ${center})`}
              strokeLinecap="round"
            />
            <circle
              cx={center}
              cy={center}
              r={strokeWidth / 2}
              fill="#e2e8f0"
            />
            <circle
              cx={center}
              cy={center}
              r={strokeWidth / 3}
              fill="#1A1F2C"
            />
          </>
        ) : (
          // Regular circular progress
          <>
            <circle
              stroke={circleOneStroke}
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              stroke={circleTwoStroke}
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
