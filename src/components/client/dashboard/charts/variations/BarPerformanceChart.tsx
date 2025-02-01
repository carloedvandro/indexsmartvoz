import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartHeader } from "../components/ChartHeader";
import { monthlyData } from "../data/chartData";

export const BarPerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Performance Mensal (Barras)" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              name="Vendas"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="trend"
              name="Comissões"
              fill="#F97316"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="projected"
              name="Projeção"
              fill="#0EA5E9"
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};