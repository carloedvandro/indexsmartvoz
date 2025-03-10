
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
      className="space-y-3 max-w-[340px] mx-auto text-center"
      variants={variants}
    >
      <div className="flex justify-center mb-4">
        <img 
          src="/lovable-uploads/17e9a31f-bc88-4247-81c6-3a0f5059c867.png" 
          alt="Smartvoz Logo" 
          className="h-10 w-auto"
        />
      </div>
      <h2 className="text-xl font-medium text-[#8425af]">Personalize seu pedido</h2>
      <p className="text-gray-600 max-w-[340px] mx-auto">
        Veja as ofertas exclusivas disponíveis para clientes Smatvoz.
      </p>
    </motion.div>
  );
}
