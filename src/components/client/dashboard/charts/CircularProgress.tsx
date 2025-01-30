import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  color: string;
}

export const CircularProgress = ({ percentage, color }: CircularProgressProps) => (
  <motion.div 
    className="relative w-36 h-36 mx-1"
    animate={{
      rotateX: [30, 30, 30],
      rotateY: [0, 180, 360],
      rotateZ: [15, 15, 15]
    }}
    transition={{
      duration: 8,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    }}
    style={{
      transformStyle: "preserve-3d",
      perspective: "1000px"
    }}
  >
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
        stroke={`url(#gradient-${percentage})`}
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
        style={{
          strokeDasharray: `${2 * Math.PI * 40}`,
          strokeDashoffset: `${2 * Math.PI * 40 * (1 - percentage / 100)}`,
          transformOrigin: '50% 50%'
        }}
      />
      <defs>
        <linearGradient id={`gradient-${percentage}`} gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-2xl font-semibold">
        {percentage}%
      </span>
    </div>
  </motion.div>
);