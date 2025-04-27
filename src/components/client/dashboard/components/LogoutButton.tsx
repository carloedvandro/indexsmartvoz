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
          viewBox="0 0 512 512" 
          className="h-8 w-8 transition-transform duration-300 hover:scale-110"
          fill="#ea384c"
        >
          <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256zm-27.3-297.3l-64 64c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l23-23V392c0 13.3 10.7 24 24 24s24-10.7 24-24V289.7l23 23c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-64-64c-9.4-9.4-24.6-9.4-33.9 0z"/>
        </svg>
      </button>
    </div>
  );
}
