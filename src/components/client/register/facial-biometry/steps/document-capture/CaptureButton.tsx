
interface CaptureButtonProps {
  isCapturing: boolean;
  captureAttempted: boolean;
  onCapture: () => void;
  onRetry: () => void;
}

export const CaptureButton = ({ 
  isCapturing, 
  captureAttempted, 
  onCapture, 
  onRetry 
}: CaptureButtonProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      {captureAttempted ? (
        <button
          onClick={onRetry}
          className="w-full h-12 bg-white text-black text-xs font-medium uppercase hover:bg-gray-100 transition-colors"
        >
          Tentar Novamente
        </button>
      ) : (
        <div className="flex flex-col items-center pb-4">
          {/* Capture button - circular white button */}
          <button
            onClick={onCapture}
            disabled={isCapturing}
            className="w-16 h-16 mb-4 rounded-full bg-transparent border-2 border-white focus:outline-none disabled:opacity-50 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-white"></div>
            <span className="sr-only">Capturar documento</span>
          </button>
        </div>
      )}
    </div>
  );
};
