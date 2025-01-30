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
      <defs>
        <linearGradient id={`gradient-${percentage}`} gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="50%" stopColor="#5f0889" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-2xl font-semibold bg-gradient-to-r from-[#000000] via-[#5f0889] to-[#000000] bg-clip-text text-transparent animate-rainbow bg-[length:200%_auto]">
        {percentage}%
      </span>
    </div>
  </div>
);