
import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  color: string;
}

export const CircularProgress = ({ percentage, color }: CircularProgressProps) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Background circle */}
      <circle
        className="text-gray-200"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
      {/* Progress circle */}
      <motion.circle
        className="origin-center"
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
          transformOrigin: '50% 50%'
        }}
        initial={{ rotate: 0 }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 3, // Increased from 1 to 3 seconds for slower animation
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-2xl font-semibold">{percentage}%</span>
    </div>
  </div>
);
