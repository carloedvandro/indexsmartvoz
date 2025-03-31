
import { useEffect } from "react";
import "@/styles/network.css";

export const NetworkStyles = () => {
  useEffect(() => {
    // Force reload network.css with a timestamp to avoid cache
    const timestamp = new Date().getTime();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/src/styles/network.css?v=${timestamp}`;
    document.head.appendChild(link);
    
    console.log(`Forçando recarga de CSS com timestamp: ${timestamp}`);
    
    return () => {
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return null;
};
