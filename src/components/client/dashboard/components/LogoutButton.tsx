
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  const [isOn, setIsOn] = useState(true);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audio] = useState(new Audio("/beep.mp3"));

  useEffect(() => {
    // Preload the audio
    audio.load();
    setAudioLoaded(true);
    
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handleToggleClick = () => {
    // Toggle state
    setIsOn(!isOn);
    
    // Play sound effect if loaded
    if (audioLoaded) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error("Error playing sound:", err));
    }
    
    // If turning off, trigger logout after animation
    if (isOn) {
      setTimeout(() => {
        onLogout();
      }, 400);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className="relative w-[110px] h-[45px] rounded-full border-2 border-gray-200 flex items-center overflow-hidden shadow-sm cursor-pointer"
        onClick={handleToggleClick}
      >
        <motion.div 
          className="absolute w-full h-full transition-colors"
          style={{ 
            backgroundColor: isOn ? "#10b981" : "#ef4444"
          }}
          initial={{ x: 0 }}
          animate={{ x: isOn ? 0 : "-100%" }}
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
          className="relative z-10 text-white font-bold ml-auto pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOn ? 0 : 1 }}
        >
          OFF
        </motion.span>
      </div>
      
      <Switch
        checked={isOn}
        onCheckedChange={(checked) => {
          setIsOn(checked);
          if (!checked) {
            setTimeout(() => onLogout(), 400);
          }
        }}
        className="hidden"
      />
      
      <span className="text-gray-700 font-medium">
        {isOn ? "Online" : "Saindo..."}
      </span>
    </div>
  );
}
