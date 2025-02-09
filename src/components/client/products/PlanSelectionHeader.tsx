
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
      className="space-y-2"
      variants={variants}
    >
      <h2 className="text-2xl font-medium">Personalize seu pedido</h2>
      <p className="text-gray-600">
        Confira aqui as melhores ofertas para você, cliente Smatvoz.
      </p>
    </motion.div>
  );
}
