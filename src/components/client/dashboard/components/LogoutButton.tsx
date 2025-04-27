
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for beep sound
    audioRef.current = new Audio('/beep.mp3');
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);
  
  const handleLogout = () => {
    // Play beep sound on logout
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play error:', err));
    }
    onLogout();
  };

  return (
    <div className={cn("relative ml-auto mr-[-58px]", className)}>
      <button 
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "text-gray-700 hover:text-red-600 font-medium rounded-md h-12 w-12 flex items-center justify-center transition-all duration-300 bg-transparent",
          className
        )}
        aria-label="Logout"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 512 512"
          className="h-8 w-8 transition-transform duration-300 hover:scale-110"
        >
          <circle cx="256" cy="256" r="256" fill="#ff0000"/>
          <path 
            d="M256 164v184M256 164c35.346 0 64 28.654 64 64v56c0 35.346-28.654 64-64 64s-64-28.654-64-64v-56c0-35.346 28.654-64 64-64z" 
            stroke="white" 
            strokeWidth="40" 
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}

