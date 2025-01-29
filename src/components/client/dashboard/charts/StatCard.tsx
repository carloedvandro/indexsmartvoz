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
        <p className="text-sm text-gray-600">Data: {label}</p>
        <p className="text-sm font-semibold text-gray-900">
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

const CustomDot = (props: any) => {
  const { cx, cy, stroke } = props;
  
  return (
    <g>
      <defs>
        <radialGradient id={`cascadeGradient-${stroke}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.8} />
          <stop offset="40%" stopColor={stroke} stopOpacity={0.6} />
          <stop offset="70%" stopColor={stroke} stopOpacity={0.4} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
        </radialGradient>
        <filter id={`cascade-${stroke}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 8 -4"
          />
        </filter>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r="6"
        fill={`url(#cascadeGradient-${stroke})`}
        className="animate-pulse"
        filter={`url(#cascade-${stroke})`}
      />
      <circle
        cx={cx}
        cy={cy}
        r="3"
        fill={stroke}
        className="animate-ping"
      />
    </g>
  );
};

export const StatCard = ({ title, value, data, color }: StatCardProps) => {
  return (
    <motion.div 
      className="p-4 rounded-xl bg-white shadow-lg transform-gpu perspective-1000 h-[300px]"
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
      }}
    >
      <motion.h3 
        className="text-sm font-medium text-gray-600"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-2xl font-bold mt-2 text-gray-900"
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
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            style={{
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
            }}
          >
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="100%" stopColor={color} stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id={`line-gradient-${color}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity={1}>
                  <animate
                    attributeName="offset"
                    values="0;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor={`${color}88`} stopOpacity={0.8}>
                  <animate
                    attributeName="offset"
                    values="0;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor={color} stopOpacity={0.2}>
                  <animate
                    attributeName="offset"
                    values="0;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={`url(#line-gradient-${color})`}
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ 
                r: 6, 
                fill: color,
                filter: `url(#cascade-${color})`,
                className: "animate-pulse"
              }}
              fill={`url(#gradient-${color})`}
              animationDuration={2000}
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};