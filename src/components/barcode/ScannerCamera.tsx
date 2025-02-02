import { RefObject } from "react";
import { ScannerOverlay } from "./ScannerOverlay";

interface ScannerCameraProps {
  videoRef: RefObject<HTMLVideoElement>;
  error: string | null;
}

export function ScannerCamera({ videoRef, error }: ScannerCameraProps) {
  return (
    <div className="relative aspect-[4/3]">
      <video 
        ref={videoRef} 
        className="absolute inset-0 w-full h-full object-cover rounded"
        autoPlay
        playsInline
      />
      <ScannerOverlay error={error} />
    </div>
  );
}