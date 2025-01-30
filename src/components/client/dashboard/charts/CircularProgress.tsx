import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  color: string;
  variant?: 'rotate' | 'pulse' | 'float' | 'bounce' | 'dash';
}

export const CircularProgress = ({ percentage, color, variant = 'rotate' }: CircularProgressProps) => {
  // Animation variants with proper typing
  const variants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    bounce: {
      y: [0, -20],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeOut"
      }
    },
    dash: {
      strokeDashoffset: [0, 251.2],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  } as const;

  return (
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
          animate={variant}
          variants={variants}
        />
      </svg>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={variant}
        variants={variants}
      >
        <span className="text-2xl font-semibold" style={{ color }}>
          {percentage}%
        </span>
      </motion.div>
    </div>
  );
};