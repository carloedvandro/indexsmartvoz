import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  color: string;
}

export const CircularProgress = ({ percentage, color }: CircularProgressProps) => (
  <div className="relative w-36 h-36 mx-1">
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
        className="origin-center animate-rainbow"
        strokeWidth="8"
        strokeLinecap="round"
        stroke={`url(#gradient-${color.replace('#', '')})`}
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
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      />
      {/* Gradient definitions */}
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-2xl font-semibold">{percentage}%</span>
    </div>
  </div>
);