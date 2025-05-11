
import React from "react";

interface PlanSelectionHeaderProps {
  variants?: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number; ease: string };
    };
  };
}

export function PlanSelectionHeader({ variants }: PlanSelectionHeaderProps) {
  // If we have variants, render with motion div, otherwise use regular div
  const Component = variants ? "div" : "div";
  const motionProps = variants ? { variants } : {};

  return (
    <div className="space-y-3 text-center">
      <div className="w-full flex justify-center mb-4">
        <img 
          src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
          alt="Smartvoz Logo" 
          className="w-auto h-[90px] object-contain"
        />
      </div>
      <h2 className="text-xl font-medium text-center text-black">Personalize seu pedido</h2>
    </div>
  );
}
