
import { Camera } from "lucide-react";

interface CameraDisplayProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  cameraActive: boolean;
  videoReady: boolean;
  cameraError: string | null;
}

export const CameraDisplay = ({ videoRef, cameraActive, videoReady, cameraError }: CameraDisplayProps) => {
  return (
    <div className="w-[340px] h-[220px] border-4 border-gray-300 rounded-xl overflow-hidden relative bg-black">
      {cameraActive && videoReady ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Camera className="h-12 w-12 text-white/50 mb-2" />
          <p className="text-white/70 text-sm text-center px-2">
            {cameraError ? "Câmera indisponível" : "Carregando câmera..."}
          </p>
        </div>
      )}
    </div>
  );
};
