
import { useState, useRef } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        className="bg-gray-100 rounded-full h-10 w-48 flex items-center overflow-hidden"
      >
        <div 
          className="absolute left-0 h-full bg-red-500 rounded-full transition-all duration-200"
          style={{ width: `${dragProgress * 100}%` }}
        />
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 150 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md cursor-grab"
          animate={{ x: isDragging ? dragProgress * 150 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <LogOut className="w-5 h-5 text-red-500" />
        </motion.div>
        <span className="ml-12 font-medium text-gray-600">
          {dragProgress > 0.5 ? "Solte para sair" : "Arraste para sair"}
        </span>
      </div>
      
      <Button
        variant="link"
        onClick={onLogout}
        className={cn("text-foreground hover:text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent gap-2 p-0 text-base hidden", className)}
      >
        <LogOut className="w-5 h-5" />
        <span>Sair</span>
      </Button>
    </div>
  );
}
