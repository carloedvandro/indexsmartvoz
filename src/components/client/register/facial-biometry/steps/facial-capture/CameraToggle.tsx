
import React from "react";
import { Camera, CameraOff } from "lucide-react";

interface CameraToggleProps {
  cameraActive: boolean;
  onToggle: () => void;
}

export const CameraToggle = ({ cameraActive, onToggle }: CameraToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="absolute top-2 right-2 z-30 bg-black/20 p-2 rounded-full"
    >
      {cameraActive ? (
        <CameraOff className="h-5 w-5 text-white" />
      ) : (
        <Camera className="h-5 w-5 text-white" />
      )}
    </button>
  );
};
