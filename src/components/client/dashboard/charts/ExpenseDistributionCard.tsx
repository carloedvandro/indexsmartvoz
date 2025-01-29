import { CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface ExpenseData {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

const expenseData: ExpenseData[] = [
  { category: "Taxas", percentage: 20, amount: 2000, color: "#5f0889" },
  { category: "Marketing", percentage: 40, amount: 4000, color: "#0EA5E9" },
  { category: "Utilidades", percentage: 12, amount: 1200, color: "#5f0889" },
  { category: "Aluguel", percentage: 8, amount: 800, color: "#0EA5E9" },
  { category: "Salários", percentage: 11, amount: 1100, color: "#5f0889" },
  { category: "Seguros", percentage: 9, amount: 900, color: "#0EA5E9" },
];

const CircularProgress = ({ percentage, color }: { percentage: number; color: string }) => (
  <div className="relative w-20 h-20">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-200"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
      <circle
        className="transition-all duration-1000 ease-in-out"
        strokeWidth="8"
        strokeLinecap="round"
        stroke={color}
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
        style={{
          strokeDasharray: `${2 * Math.PI * 40}`,
          strokeDashoffset: `${2 * Math.PI * 40 * (1 - percentage / 100)}`,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%'
        }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-lg font-semibold">{percentage}%</span>
    </div>
  </div>
);

export const ExpenseDistributionCard = () => {
  return (
    <div className="space-y-8 rounded-lg bg-white p-6 shadow-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Distribuição de Despesas</CardTitle>
      </CardHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {expenseData.map((item) => (
          <motion.div
            key={item.category}
            className="flex flex-col items-center space-y-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CircularProgress percentage={item.percentage} color={item.color} />
            <span className="text-sm font-medium text-center">{item.category}</span>
          </motion.div>
        ))}
      </div>

      <div className="h-[200px] mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fill: "#000000" }}
              stroke="#000000"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#000000" }}
              stroke="#000000"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`${value}%`, "Percentual"]}
            />
            <Bar
              dataKey="percentage"
              fill="#5f0889"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};