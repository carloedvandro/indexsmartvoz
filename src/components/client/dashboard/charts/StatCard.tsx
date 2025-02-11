
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-sm p-3 border border-gray-200 rounded-lg shadow-lg"
      >
        <p className="text-sm text-black">Data: {label}</p>
        <p className="text-sm font-semibold text-black">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(payload[0].value)}
        </p>
      </motion.div>
    );
  }
  return null;
};

export const StatCard = ({ title, value, data, color }: StatCardProps) => {
  return (
    <motion.div 
      className="p-4 rounded-xl shadow-sm h-[300px] border border-gray-200/20"
      initial={{ rotateX: 25, scale: 0.9, opacity: 0 }}
      animate={{ rotateX: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        transition: { duration: 0.2 }
      }}
      style={{
        transformStyle: "preserve-3d",
        width: 'calc(100% - 20px)',
        margin: '0 15px 0 5px'
      }}
    >
      <motion.h3 
        className="text-sm font-medium text-black ml-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-2xl font-bold mt-2 ml-6"
        style={{ color }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {value}
      </motion.p>
      <motion.div 
        className="mt-4 h-[200px] w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
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
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ 
                fill: "#fff", 
                stroke: color,
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{ 
                r: 6, 
                fill: "#fff",
                stroke: color,
                strokeWidth: 2,
                className: "custom-pulse"
              }}
              animationDuration={2000}
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};
