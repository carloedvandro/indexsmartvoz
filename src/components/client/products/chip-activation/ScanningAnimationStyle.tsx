
import React from 'react';

export function ScanningAnimationStyle() {
  return (
    <style jsx global>{`
      @keyframes scan-line {
        0%, 100% {
          top: 20%;
        }
        50% {
          top: 80%;
        }
      }
      
      .animate-scan-line {
        animation: scan-line 1.5s ease-in-out infinite;
      }
    `}</style>
  );
}
