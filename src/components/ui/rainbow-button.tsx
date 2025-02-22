
import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium text-white",
        "bg-[#5f0889] bg-opacity-90 hover:bg-[#4a0668] hover:bg-opacity-90",
        "backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "transition-all duration-300 ease-out border-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
