
import React from "react";
import { Pie } from "recharts";
import { PieDataItem } from "../../types/salesTypes";
import { PieSlice } from "./PieSlice";
import { PercentageLabel } from "./PercentageLabel";

interface MainPieChartProps {
  pieData: PieDataItem[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export const MainPieChart = ({ pieData, activeIndex, setActiveIndex }: MainPieChartProps) => {
  return (
    <Pie
      data={pieData}
      innerRadius={85}
      outerRadius={135}
      paddingAngle={0}
      dataKey="value"
      animationBegin={0}
      animationDuration={1200}
      animationEasing="ease-in-out"
      startAngle={90}
      endAngle={-270}
      stroke="#ffffff"
      strokeWidth={2}
      style={{ 
        filter: 'drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.25))',
        transform: 'perspective(800px) rotateX(25deg) scale3d(1.05, 1.05, 1.05) translateY(5px)',
        transformOrigin: 'center center',
        transition: 'transform 0.5s ease-out',
      }}
      labelLine={false}
      label={(props) => (
        <PercentageLabel
          props={props}
          pieData={pieData}
          activeIndex={activeIndex}
        />
      )}
    >
      {pieData.map((entry, index) => (
        <PieSlice 
          key={`slice-${index}`}
          pieData={pieData}
          activeIndex={activeIndex}
          index={index}
          onClick={setActiveIndex}
        />
      ))}
    </Pie>
  );
};
