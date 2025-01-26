import { useState, useEffect } from "react";

interface CaptureGuideProps {
  isAligned: boolean;
  countdown: number | null;
  side: "front" | "back";
}

export function CaptureGuide({ isAligned, countdown, side }: CaptureGuideProps) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <svg className="w-full h-full">
        <rect
          x="5%"
          y="5%"
          width="90%"
          height="90%"
          fill="none"
          stroke={isAligned ? "green" : "white"}
          strokeWidth="2"
          rx="4"
        />
      </svg>
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl font-bold text-white bg-black/50 w-32 h-32 rounded-full flex items-center justify-center">
            {countdown}
          </span>
        </div>
      )}
    </div>
  );
}