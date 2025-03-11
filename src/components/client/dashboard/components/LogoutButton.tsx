
import { useState, useRef } from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const constraintsRef = useRef(null);
  
  const handleDragEnd = () => {
    if (dragProgress > 0.7) {
      onLogout();
    }
    setIsDragging(false);
    setDragProgress(0);
  };

  const handleDrag = (_: any, info: any) => {
    const progress = Math.min(Math.max(info.offset.x / 150, 0), 1);
    setDragProgress(progress);
    setIsDragging(progress > 0);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={constraintsRef}
        className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-full h-12 w-48 flex items-center overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <motion.div 
          className="absolute left-0 h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-200"
          style={{ width: `${dragProgress * 100}%` }}
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: isDragging ? 1 : 0.8,
            scale: isDragging ? 1.02 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 150 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-grab"
          whileDrag={{ scale: 1.1 }}
          whileHover={{ scale: 1.05 }}
          animate={{ 
            x: isDragging ? dragProgress * 150 : 0,
            boxShadow: isDragging ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <LogOut className={cn(
            "w-5 h-5 transition-colors duration-300",
            dragProgress > 0.5 ? "text-red-500" : "text-purple-500"
          )} />
        </motion.div>
        <span className={cn(
          "ml-14 font-medium transition-all duration-300",
          dragProgress > 0.5 ? "text-white" : "text-purple-700"
        )}>
          {dragProgress > 0.5 ? "Solte para sair" : "Arraste para sair"}
        </span>
      </div>
    </div>
  );
}
