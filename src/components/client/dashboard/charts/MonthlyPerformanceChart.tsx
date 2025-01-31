import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";
import { monthlyData } from "./data/chartData";

export const MonthlyPerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Faturamento Mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="15%" stopColor="#2a2a2a" />
                <stop offset="20%" stopColor="#4f0666" />
                <stop offset="25%" stopColor="#600788" />
                <stop offset="30%" stopColor="#800abc" />
                <stop offset="35%" stopColor="#910bc4" />
                <stop offset="100%" stopColor="#910bc4" />
              </linearGradient>
              <linearGradient id="commissionsGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="15%" stopColor="#2a2a2a" />
                <stop offset="20%" stopColor="#4f0666" />
                <stop offset="25%" stopColor="#600788" />
                <stop offset="30%" stopColor="#800abc" />
                <stop offset="35%" stopColor="#910bc4" />
                <stop offset="100%" stopColor="#910bc4" />
              </linearGradient>
              <linearGradient id="projectionGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="15%" stopColor="#2a2a2a" />
                <stop offset="20%" stopColor="#4f0666" />
                <stop offset="25%" stopColor="#600788" />
                <stop offset="30%" stopColor="#800abc" />
                <stop offset="35%" stopColor="#910bc4" />
                <stop offset="100%" stopColor="#910bc4" />
              </linearGradient>
              <style type="text/css">
                {`
                  .custom-legend .recharts-legend-item-text {
                    font-weight: bold;
                  }
                  .sales-legend { color: #5f0889 !important; }
                  .commissions-legend { color: #000695 !important; }
                  .projection-legend { color: #0610ff !important; }
                `}
              </style>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#1f2937" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              style={{
                fontWeight: 'bold'
              }}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `${value}`}
              style={{
                fontWeight: 'bold'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontWeight: 'bold'
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px",
                fontWeight: 'bold'
              }}
              className="custom-legend"
              formatter={(value) => {
                let className = '';
                if (value === 'Vendas') className = 'sales-legend';
                if (value === 'Comissões') className = 'commissions-legend';
                if (value === 'Projeção') className = 'projection-legend';
                return <span className={className}>{value}</span>;
              }}
            />
            <Bar
              dataKey="value"
              name="Vendas"
              fill="url(#salesGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              className="animate-rainbow"
            />
            <Bar
              dataKey="trend"
              name="Comissões"
              fill="url(#commissionsGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              className="animate-rainbow"
            />
            <Bar
              dataKey="projected"
              name="Projeção"
              fill="url(#projectionGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              className="animate-rainbow"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#5f0889"
              strokeDasharray="5 5"
              dot={{ fill: '#5f0889', r: 4 }}
              activeDot={{ r: 6, fill: '#5f0889' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};