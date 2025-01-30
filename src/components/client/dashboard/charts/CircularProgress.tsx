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
          transformOrigin: '50% 50%',
          transform: 'rotate3d(1, 0.5, 0, 30deg)'
        }}
        initial={{ rotate: 0 }}
        animate={{
          rotate: [0, 360],
          rotateX: [30, 30],
          rotateY: [0, 360],
          rotateZ: [15, 15]
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
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor="#9b87f5" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span 
        className="text-2xl font-semibold"
        style={{
          background: `linear-gradient(to right, #000000, #5f0889)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {percentage}%
      </span>
    </div>
  </div>
);