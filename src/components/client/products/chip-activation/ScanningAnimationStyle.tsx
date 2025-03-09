
import { useEffect } from "react";

export function ScanningAnimationStyle() {
  useEffect(() => {
    if (!document.getElementById('scan-line-animation')) {
      const style = document.createElement('style');
      style.id = 'scan-line-animation';
      style.innerHTML = `
        @keyframes scan-line {
          0% {
            top: 20%;
          }
          50% {
            top: 80%;
          }
          100% {
            top: 20%;
          }
        }
        .animate-scan-line {
          animation: scan-line 1.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const styleElement = document.getElementById('scan-line-animation');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return null;
}
