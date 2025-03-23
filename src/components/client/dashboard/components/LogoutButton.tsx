
import { useState, useEffect } from "react";
import { Power } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
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

  const handleLogout = () => {
    // Play sound effect if loaded
    if (audioLoaded) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error("Error playing sound:", err));
    }
    
    // Trigger logout after a short delay
    setTimeout(() => {
      onLogout();
    }, 300);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 text-[#ea384c] hover:opacity-80 transition-opacity py-2"
      >
        <Power className="w-5 h-5" />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  );
}
