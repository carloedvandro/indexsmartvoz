import { useState } from "react";
import { cn } from "@/lib/utils";

interface SlideButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function SlideButton({ children, onClick, className, disabled }: SlideButtonProps) {
  const [isSliding, setIsSliding] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsSliding(true);
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsSliding(false);
      onClick?.();
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        "px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white font-bold",
        "hover:bg-white/10 active:scale-95",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Background slide effect */}
      <div
        className={cn(
          "absolute inset-0 bg-white/20 transition-transform duration-300 ease-out",
          isSliding ? "translate-x-0" : "-translate-x-full"
        )}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
}