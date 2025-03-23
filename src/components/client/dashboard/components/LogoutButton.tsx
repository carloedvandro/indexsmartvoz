
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  const [isOn, setIsOn] = useState(true);

  const handleToggleChange = (checked: boolean) => {
    setIsOn(checked);
    
    // If turning off, trigger logout
    if (!checked) {
      // Short delay to allow the animation to complete
      setTimeout(() => {
        onLogout();
      }, 300);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-[110px] h-[45px] rounded-full border-2 border-gray-200 flex items-center overflow-hidden shadow-sm">
        <motion.div 
          className="absolute w-full h-full bg-green-500 transition-colors"
          initial={{ x: 0 }}
          animate={{ x: isOn ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        
        <motion.span 
          className="relative z-10 text-white font-bold pl-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOn ? 1 : 0 }}
        >
          ON
        </motion.span>
        
        <motion.div 
          className="absolute z-20 w-[40px] h-[40px] bg-white rounded-full shadow-md"
          initial={{ x: "65px" }}
          animate={{ x: isOn ? "65px" : "5px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        
        <motion.span 
          className="relative z-10 text-gray-700 font-bold ml-auto pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOn ? 0 : 1 }}
        >
          OFF
        </motion.span>
      </div>
      
      <Switch
        checked={isOn}
        onCheckedChange={handleToggleChange}
        className="hidden"
      />
      
      <span className="text-gray-700 font-medium">
        {isOn ? "Online" : "Saindo..."}
      </span>
    </div>
  );
}
