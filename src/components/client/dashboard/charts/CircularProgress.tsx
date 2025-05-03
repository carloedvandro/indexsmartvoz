
import React from 'react';

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 75,
  size = 220,
  strokeWidth = 24,
  primaryColor = '#33C3F0',
  secondaryColor = '#8425af',
  children,
}) => {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke={primaryColor}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          stroke={secondaryColor}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
