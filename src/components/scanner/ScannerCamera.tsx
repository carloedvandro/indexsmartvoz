import { useEffect, RefObject } from "react";

interface ScannerCameraProps {
  ref: RefObject<HTMLVideoElement>;
  hasPermission: boolean | null;
  onPermissionDenied: () => void;
}

export function ScannerCamera({ ref, hasPermission, onPermissionDenied }: ScannerCameraProps) {
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "environment",
            width: { ideal: 240 },
            height: { ideal: 740 }
          } 
        });
        
        if (ref?.current) {
          ref.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        onPermissionDenied();
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (ref?.current) {
        ref.current.srcObject = null;
      }
    };
  }, [ref, onPermissionDenied]);

  if (hasPermission === false) {
    return (
      <div className="text-center text-red-500 p-4">
        Por favor, permita o acesso à câmera para escanear o código.
      </div>
    );
  }

  return (
    <div className="relative h-[30vh] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <video 
          ref={ref} 
          className="w-full h-[10vh] object-cover"
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}