
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
    <div className={cn("relative ml-auto mr-[-50px] md:mr-[-50px]", className)}>
      <button 
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "text-gray-700 hover:text-gray-900 font-medium rounded-md h-12 w-12 flex items-center justify-center transition-all duration-300 bg-transparent border-none p-0",
          className
        )}
        aria-label="Logout"
      >
        <img 
          src="/lovable-uploads/cde64109-d71e-43a4-a3b4-9bd0b6e2a03a.png" 
          alt="Logout" 
          className="h-[60px] w-[60px] object-contain transition-transform duration-300 hover:scale-110"
        />
      </button>
    </div>
  );
}
