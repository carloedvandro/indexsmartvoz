
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
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium",
        "text-white bg-[#8425af] bg-opacity-95",
        "hover:bg-[#7a1ea6] hover:bg-opacity-95",
        "shadow-[0_0_20px_rgba(132,37,175,0.3)]",
        "transition-all duration-300 ease-out border-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8425af]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(132,37,175,0.95), rgba(132,37,175,0.9))"
      }}
      {...props}
    >
      {children}
    </button>
  );
}
