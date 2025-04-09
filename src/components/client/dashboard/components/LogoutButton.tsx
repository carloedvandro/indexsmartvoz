
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

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
    <div className={cn("relative", className)}>
      <button 
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "text-gray-700 hover:text-red-600 font-medium rounded-md h-14 w-14 flex items-center justify-center transition-all duration-300",
          hover ? "bg-red-50" : "bg-transparent",
          className
        )}
        aria-label="Logout"
      >
        <LogOut 
          className="h-6 w-6 transition-transform duration-300 hover:scale-110" 
        />
      </button>
    </div>
  );
}
