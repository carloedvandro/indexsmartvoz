import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { ExpenseData } from "./types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const initialData = [
  { month: 'Jan', atual: 75, receita: 65 },
  { month: 'Fev', atual: 70, receita: 72 },
  { month: 'Mar', atual: 75, receita: 68 },
  { month: 'Abr', atual: 65, receita: 75 },
  { month: 'Mai', atual: 80, receita: 62 },
  { month: 'Jun', atual: 70, receita: 48 },
  { month: 'Jul', atual: 55, receita: 70 },
  { month: 'Ago', atual: 72, receita: 75 },
  { month: 'Set', atual: 62, receita: 78 },
  { month: 'Out', atual: 68, receita: 62 },
  { month: 'Nov', atual: 71, receita: 69 },
  { month: 'Dez', atual: 73, receita: 71 }
];

const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      rx={4}
      ry={4}
      height={height}
      fill={fill}
      initial={{ y: 0, height: 0 }}
      animate={{ 
        y: y,
        height: height,
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

export const ExpenseBarChart = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          atual: item.atual + (Math.random() * 10 - 5),
          receita: item.receita + (Math.random() * 10 - 5)
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[200px] mt-6 w-full min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 2, bottom: 5 }}>
          <XAxis 
            dataKey="month" 
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
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend 
            formatter={(value) => <span style={{ color: '#000000', fontWeight: 'bold' }}>{value}</span>}
          />
          <Bar
            dataKey="atual"
            name="Atual"
            fill="#5f0889"
            radius={[4, 4, 0, 0]}
            barSize={8}
            shape={<CustomBar />}
          />
          <Bar
            dataKey="receita"
            name="Receita"
            fill="#0610ff"
            radius={[4, 4, 0, 0]}
            barSize={8}
            shape={<CustomBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};