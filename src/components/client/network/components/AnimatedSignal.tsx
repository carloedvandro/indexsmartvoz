
import { motion } from "framer-motion";

export const AnimatedSignal = () => {
  const bars = [
    { height: "20%", delay: 0 },
    { height: "40%", delay: 0.2 },
    { height: "60%", delay: 0.4 },
    { height: "80%", delay: 0.6 },
    { height: "100%", delay: 0.8 }
  ];

  return (
    <div className="flex items-end h-3.5 gap-[1px] align-middle">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: bar.height,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: bar.delay,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="w-[2px] bg-[#660099]"
        />
      ))}
    </div>
  );
};
