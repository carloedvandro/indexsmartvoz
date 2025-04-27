
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
    <div className={cn("relative ml-[40px]", className)}>
      <button 
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "text-gray-700 hover:text-red-600 font-medium rounded-md h-12 w-12 flex items-center justify-center transition-all duration-300 bg-transparent mt-1",
          className
        )}
        aria-label="Logout"
      >
        <img 
          src="/lovable-uploads/78dbfd4e-37c2-4b7c-8bb9-b400c2cdb84d.png" 
          alt="Logout" 
          className="h-8 w-8 transition-transform duration-300 hover:scale-110" 
        />
      </button>
    </div>
  );
}
