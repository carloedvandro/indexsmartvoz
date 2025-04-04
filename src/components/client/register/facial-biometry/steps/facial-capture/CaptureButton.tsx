
import React from "react";

interface CaptureButtonProps {
  onClick: () => void;
  disabled: boolean;
  isProcessing: boolean;
  faceDetected: boolean;
  cameraActive: boolean;
}

export const CaptureButton = ({ 
  onClick, 
  disabled, 
  isProcessing, 
  faceDetected, 
  cameraActive 
}: CaptureButtonProps) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
      <button 
        onClick={onClick}
        disabled={disabled}
        className="focus:outline-none"
      >
        <div className={`w-16 h-16 rounded-full 
            ${faceDetected && cameraActive ? 'bg-green-500' : 'bg-white/30'} 
            flex items-center justify-center relative
            ${isProcessing ? 'opacity-70' : 'opacity-100'}`}
        >
          <div className={`w-12 h-12 rounded-full 
            ${faceDetected && cameraActive ? 'bg-green-600' : 'bg-white/50'} 
            ${isProcessing ? 'animate-pulse' : ''}`}
          ></div>
        </div>
      </button>
    </div>
  );
};
