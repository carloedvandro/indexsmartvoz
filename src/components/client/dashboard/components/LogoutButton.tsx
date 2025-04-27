
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
    <div className={cn("flex items-center justify-center w-full", className)}>
      <button 
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md w-full transition-all duration-300"
        aria-label="Logout"
      >
        <img 
          src="/lovable-uploads/cde64109-d71e-43a4-a3b4-9bd0b6e2a03a.png" 
          alt="Logout" 
          className="h-[30px] w-[30px] object-contain"
        />
        <span>Sair</span>
      </button>
    </div>
  );
}
