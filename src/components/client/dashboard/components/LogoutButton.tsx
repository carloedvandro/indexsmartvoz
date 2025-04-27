
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
    <div className={cn("relative ml-auto -mt-[10px] mr-[40px]", className)}>
      <button 
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "text-gray-700 hover:text-gray-900 font-medium rounded-md h-24 w-24 flex items-center justify-center transition-all duration-300 bg-transparent border-none p-0 outline-none focus:outline-none",
          className
        )}
        aria-label="Logout"
      >
        <img 
          src="/lovable-uploads/9359887d-11de-431a-99fe-a9c542364d8e.png" 
          alt="Logout" 
          className="object-contain h-[70px] w-[70px] transition-transform duration-300 hover:scale-110 border-none outline-none rounded-none"
        />
      </button>
    </div>
  );
}
