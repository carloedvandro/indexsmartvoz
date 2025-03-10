
import React from 'react';

export function ScanningAnimationStyle() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
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
      `
    }} />
  );
}
