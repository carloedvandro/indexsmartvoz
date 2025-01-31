import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";
import { monthlyData } from "./data/chartData";

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <ChartHeader title="Performance Mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#1f2937" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px"
              }}
            />
            <Bar
              dataKey="value"
              name="Vendas"
              fill="#F97316"
              radius={[4, 4, 0, 0]}
              barSize={8}
            />
            <Bar
              dataKey="trend"
              name="Comissões"
              fill="#0EA5E9"
              radius={[4, 4, 0, 0]}
              barSize={8}
            />
            <Bar
              dataKey="projected"
              name="Projeção"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              barSize={8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};