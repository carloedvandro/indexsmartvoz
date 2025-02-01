import { useState } from "react";
import { AreaPerformanceChart } from "./variations/AreaPerformanceChart";
import { BarPerformanceChart } from "./variations/BarPerformanceChart";
import { LinePerformanceChart } from "./variations/LinePerformanceChart";
import { StackedBarPerformanceChart } from "./variations/StackedBarPerformanceChart";
import { CurvedLinePerformanceChart } from "./variations/CurvedLinePerformanceChart";

const charts = [
  { id: 1, component: AreaPerformanceChart, name: "Área" },
  { id: 2, component: BarPerformanceChart, name: "Barras" },
  { id: 3, component: LinePerformanceChart, name: "Linhas" },
  { id: 4, component: StackedBarPerformanceChart, name: "Barras Empilhadas" },
  { id: 5, component: CurvedLinePerformanceChart, name: "Linhas Curvas" },
];

export const ChartGallery = () => {
  const [selectedChart, setSelectedChart] = useState(1);

  const ChartComponent = charts.find((chart) => chart.id === selectedChart)?.component || AreaPerformanceChart;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {charts.map((chart) => (
          <button
            key={chart.id}
            onClick={() => setSelectedChart(chart.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedChart === chart.id
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {chart.name}
          </button>
        ))}
      </div>
      <ChartComponent />
    </div>
  );
};