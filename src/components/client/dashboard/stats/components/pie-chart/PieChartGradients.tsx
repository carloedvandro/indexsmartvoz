
import React from "react";
import { PieDataItem } from "../../types/salesTypes";

interface PieChartGradientsProps {
  pieData: PieDataItem[];
}

export const PieChartGradients = ({ pieData }: PieChartGradientsProps) => {
  return (
    <defs>
      {pieData.map((entry, index) => (
        <React.Fragment key={`gradient-fragment-${index}`}>
          <linearGradient 
            key={`gradient-${index}`} 
            id={`glossyGradient${index}`} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="100%"
          >
            <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
            <stop offset="40%" stopColor={entry.color} stopOpacity={1} />
            <stop offset="100%" stopColor={`${entry.color}dd`} stopOpacity={0.85} />
          </linearGradient>
          
          <linearGradient 
            key={`reflection-${index}`} 
            id={`reflectionGradient${index}`} 
            x1="0%" 
            y1="0%" 
            x2="0%" 
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
            <stop offset="30%" stopColor="#ffffff" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </React.Fragment>
      ))}
    </defs>
  );
};
