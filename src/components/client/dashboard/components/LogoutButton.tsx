
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element for click sound
    audioRef.current = new Audio('/beep.mp3');
    
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggle = () => {
    setIsActive(!isActive);
    
    // If toggling to active, play sound and trigger logout
    if (!isActive) {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play error:', err));
      }
      
      // Add small delay before logout to allow animation to complete
      setTimeout(() => {
        onLogout();
      }, 500);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div 
        className="w-[190px] h-12 rounded-full shadow-md cursor-pointer overflow-hidden"
        onClick={handleToggle}
      >
        <div className="relative w-full h-full flex items-center">
          {/* Background that changes color based on state */}
          <div 
            className={cn(
              "absolute inset-0 rounded-full transition-colors duration-300",
              isActive ? "bg-green-500" : "bg-purple-200"
            )}
          />
          
          {/* Toggle circle */}
          <motion.div
            className="absolute z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
            animate={{ 
              x: isActive ? 150 : 4,
              backgroundColor: isActive ? "white" : "white"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              stroke={isActive ? "#22c55e" : "#8b5cf6"} 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </motion.div>
          
          {/* Text that changes based on state */}
          <div 
            className={cn(
              "absolute transition-all duration-300 font-medium",
              isActive 
                ? "left-8 text-white" 
                : "left-16 text-purple-800"
            )}
          >
            {isActive ? "Saindo..." : "Arraste para sair"}
          </div>
        </div>
      </div>
    </div>
  );
}
