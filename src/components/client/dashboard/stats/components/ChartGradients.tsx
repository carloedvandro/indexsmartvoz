
import React from "react";
import { PieDataItem } from "../types/salesTypes";

interface ChartGradientsProps {
  pieData: PieDataItem[];
}

export const ChartGradients: React.FC<ChartGradientsProps> = ({ pieData }) => {
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
            <animate 
              attributeName="x1" 
              values="0%;20%;0%" 
              dur="3s" 
              repeatCount="indefinite" 
              begin={`${index * 0.5}s`} 
            />
          </linearGradient>
          
          <linearGradient 
            key={`hover-gradient-${index}`} 
            id={`hoverGradient${index}`} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="100%"
          >
            <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
            <stop offset="100%" stopColor={`${entry.color}ee`} stopOpacity={0.9} />
            <animate 
              attributeName="y1" 
              values="0%;20%;0%" 
              dur="2s" 
              repeatCount="indefinite" 
            />
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
