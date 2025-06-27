
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PowerButtonProps {
  className?: string;
  onToggle?: (isOn: boolean) => void;
}

function PowerButton({ className, onToggle }: PowerButtonProps) {
  const [isOn, setIsOn] = useState(false);

  const togglePower = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
  };

  return (
    <button
      className={cn(
        "relative w-16 h-16 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        isOn 
          ? "bg-gradient-to-br from-purple-600 to-blue-500 border-transparent shadow-lg shadow-purple-500/25" 
          : "bg-gray-800 border-gray-600 hover:border-gray-500",
        className
      )}
      onClick={togglePower}
      aria-pressed={isOn}
      aria-label="Power Button"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 mx-auto"
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#gradient)"
          strokeWidth="3"
          className={cn(
            "transition-all duration-300",
            isOn ? "opacity-100" : "opacity-60"
          )}
        />
        <path
          d="M32 18V32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            isOn ? "text-white" : "text-gray-400"
          )}
        />
        <path
          d="M22 38A14 14 0 0 0 42 38"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            isOn ? "text-white" : "text-gray-400"
          )}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#8a2be2" />
            <stop offset="100%" stopColor="#00bfff" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Glow effect when enabled */}
      {isOn && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-20 animate-pulse" />
      )}
    </button>
  );
}

export default PowerButton;
