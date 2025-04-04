
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
          className="w-full h-14 bg-white text-black text-sm font-medium uppercase hover:bg-gray-100 transition-colors"
        >
          Tentar Novamente
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={onCapture}
            disabled={isCapturing}
            className="w-14 h-14 mb-4 rounded-full bg-white border-2 border-gray-300 focus:outline-none disabled:opacity-50"
          >
            <span className="sr-only">Capturar documento</span>
          </button>
          <button
            className="w-full h-14 bg-white text-black text-sm font-medium uppercase hover:bg-gray-100 transition-colors"
          >
            Avançar
          </button>
        </div>
      )}
    </div>
  );
};
