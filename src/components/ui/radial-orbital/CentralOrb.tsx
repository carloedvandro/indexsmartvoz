
import React from "react";

export function CentralOrb() {
  return (
    <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
      <div className="absolute w-14 h-14 rounded-full border border-white/20 animate-ping opacity-70"></div>
      <div
        className="absolute w-16 h-16 rounded-full border border-white/10 animate-ping opacity-50"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div className="w-5 h-5 rounded-full bg-white/80 backdrop-blur-md"></div>
    </div>
  );
}
