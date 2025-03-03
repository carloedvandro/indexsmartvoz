
import { motion } from "framer-motion";
import React from "react";

interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <motion.div 
      className="flex flex-col space-y-2 text-center"
      variants={itemVariants}
    >
      <div className="flex justify-center mb-8">
        <img 
          src="/lovable-uploads/6476bb03-0467-42d7-ae08-31ae5f2da580.png" 
          alt="Smartvoz" 
          className="w-auto h-16"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </motion.div>
  );
}
