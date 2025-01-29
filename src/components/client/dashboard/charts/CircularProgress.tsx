import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  color: string;
}

export const CircularProgress = ({ percentage, color }: CircularProgressProps) => (
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
      <motion.circle
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
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-lg font-semibold">{percentage}%</span>
    </div>
  </div>
);