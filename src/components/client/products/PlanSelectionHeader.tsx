
import React from "react";
import { motion } from "framer-motion";

interface PlanSelectionHeaderProps {
  variants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number; ease: string };
    };
  };
}

export function PlanSelectionHeader({ variants }: PlanSelectionHeaderProps) {
  return (
    <motion.div 
      className="space-y-3 max-w-[350px] mx-auto text-center pt-5"
      variants={variants}
    >
      <div className="w-full flex justify-center mb-4">
        <img 
          src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
          alt="Smartvoz Logo" 
          className="h-[140px] object-contain mix-blend-multiply opacity-90 contrast-125"
        />
      </div>
      <h2 className="text-xl font-medium text-[#8425af]">Personalize seu pedido</h2>
    </motion.div>
  );
}
