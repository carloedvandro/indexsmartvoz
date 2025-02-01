import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartHeader } from "../components/ChartHeader";
import { monthlyData } from "../data/chartData";

export const CurvedLinePerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Performance Mensal (Linhas Curvas)" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="natural"
              dataKey="value"
              name="Vendas"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", r: 4 }}
            />
            <Line
              type="natural"
              dataKey="trend"
              name="Comissões"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: "#F97316", r: 4 }}
            />
            <Line
              type="natural"
              dataKey="projected"
              name="Projeção"
              stroke="#0EA5E9"
              strokeWidth={3}
              dot={{ fill: "#0EA5E9", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};