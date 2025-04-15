
import React from "react";
import Webcam from "react-webcam";
import { CameraOff } from "lucide-react";

interface CameraViewProps {
  webcamRef: React.RefObject<Webcam>;
  cameraActive: boolean;
  videoConstraints: any;
}

export const CameraView = ({ webcamRef, cameraActive, videoConstraints }: CameraViewProps) => {
  return (
    <div className="relative h-full">
      {cameraActive ? (
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
          mirrored={true}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <CameraOff className="h-16 w-16 text-white/50" />
          <p className="text-white/70 mt-4">Câmera desativada</p>
        </div>
      )}
    </div>
  );
};
