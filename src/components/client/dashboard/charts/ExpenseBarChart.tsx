import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
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

// Efeito 1: Bounce
const BounceBar = (props: any) => {
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
      initial={{ y: 0 }}
      animate={{ 
        y: [
          y,           // posição inicial
          y - 30,      // sobe alto
          y,           // volta
          y - 20,      // sobe médio
          y,           // volta
          y - 10,      // sobe baixo
          y            // posição final
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: [0.17, 0.67, 0.83, 0.67], // easing elástico
        times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1] // timing dos keyframes
      }}
    />
  );
};

// Efeito 2: Pulse
const PulseBar = (props: any) => {
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
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

// Efeito 3: Wave
const WaveBar = (props: any) => {
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
      initial={{ scaleY: 0.9 }}
      animate={{ scaleY: [0.9, 1.1, 0.9] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Efeito 4: Glow
const GlowBar = (props: any) => {
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
      initial={{ filter: "brightness(1)" }}
      animate={{ filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Efeito 5: Shake
const ShakeBar = (props: any) => {
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
      initial={{ x }}
      animate={{ x: [x - 2, x + 2, x] }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export const ExpenseBarChart = () => {
  const [data, setData] = useState(initialData);
  const [currentEffect, setCurrentEffect] = useState(0);
  const effects = [BounceBar, PulseBar, WaveBar, GlowBar, ShakeBar];

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          atual: item.atual + (Math.random() * 10 - 5),
          receita: item.receita + (Math.random() * 10 - 5)
        }))
      );
    }, 2000);

    const effectInterval = setInterval(() => {
      setCurrentEffect((prev) => (prev + 1) % effects.length);
    }, 5000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(effectInterval);
    };
  }, []);

  const CurrentBarEffect = effects[currentEffect];

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
            shape={<CurrentBarEffect />}
          />
          <Bar
            dataKey="receita"
            name="Receita"
            fill="#0610ff"
            radius={[4, 4, 0, 0]}
            barSize={8}
            shape={<CurrentBarEffect />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
