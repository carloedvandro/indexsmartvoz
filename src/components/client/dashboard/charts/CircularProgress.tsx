import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  color: string;
  variant?: "rotate3D" | "tilt" | "flip" | "pyramid" | "wave";
}

export const CircularProgress = ({ percentage, color, variant = "rotate3D" }: CircularProgressProps) => {
  const variants = {
    rotate3D: {
      transform: [
        "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        "perspective(1000px) rotateX(360deg) rotateY(360deg)",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }
    },
    tilt: {
      transform: [
        "perspective(1000px) rotateX(20deg) rotateY(0deg)",
        "perspective(1000px) rotateX(20deg) rotateY(360deg)",
      ],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear",
      }
    },
    flip: {
      transform: [
        "perspective(1000px) rotateX(0deg)",
        "perspective(1000px) rotateX(360deg)",
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }
    },
    pyramid: {
      transform: [
        "perspective(1000px) rotateX(30deg) rotateY(0deg)",
        "perspective(1000px) rotateX(30deg) rotateY(360deg)",
      ],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }
    },
    wave: {
      transform: [
        "perspective(1000px) rotateX(10deg) rotateY(0deg) translateZ(0px)",
        "perspective(1000px) rotateX(10deg) rotateY(180deg) translateZ(50px)",
        "perspective(1000px) rotateX(10deg) rotateY(360deg) translateZ(0px)",
      ],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="relative w-36 h-36 mx-1">
      <motion.div
        className="w-full h-full"
        animate={variants[variant]}
        style={{
          transformStyle: "preserve-3d",
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
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">{percentage}%</span>
        </div>
      </motion.div>
    </div>
  );
};