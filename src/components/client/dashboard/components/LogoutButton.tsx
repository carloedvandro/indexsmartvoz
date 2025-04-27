
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
          <path d="M256 128c-22.1 0-40 17.9-40 40v176c0 22.1 17.9 40 40 40s40-17.9 40-40V168c0-22.1-17.9-40-40-40zm0-64c-88.4 0-160 71.6-160 160v176c0 88.4 71.6 160 160 160s160-71.6 160-160V224c0-88.4-71.6-160-160-160zm0 416c-44.2 0-80-35.8-80-80V168c0-44.2 35.8-80 80-80s80 35.8 80 80v272c0 44.2-35.8 80-80 80z" fill="white"/>
        </svg>
      </button>
    </div>
  );
}
