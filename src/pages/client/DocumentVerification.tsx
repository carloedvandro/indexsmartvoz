
import { useNavigate } from "react-router-dom";
import { useCameraCapture } from "@/hooks/useCameraCapture";
import { CameraDisplay } from "@/components/client/document-verification/CameraDisplay";
import { StatusDisplay } from "@/components/client/document-verification/StatusDisplay";
import { ActionButtons } from "@/components/client/document-verification/ActionButtons";

export const DocumentVerification = () => {
  const navigate = useNavigate();
  const {
    status,
    isProcessing,
    cameraActive,
    cameraError,
    videoReady,
    videoRef,
    capturarEAnalisar,
    tentarNovamente
  } = useCameraCapture();

  const handleCapture = () => {
    capturarEAnalisar(
      () => navigate('/client/verification-complete'),
      () => navigate('/client/verification-rejected')
    );
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <CameraDisplay
        videoRef={videoRef}
        cameraActive={cameraActive}
        videoReady={videoReady}
        cameraError={cameraError}
      />

      <StatusDisplay status={status} />

      <ActionButtons
        onCapture={handleCapture}
        onTryAgain={tentarNovamente}
        isProcessing={isProcessing}
        cameraActive={cameraActive}
        videoReady={videoReady}
        cameraError={cameraError}
      />
    </div>
  );
};
