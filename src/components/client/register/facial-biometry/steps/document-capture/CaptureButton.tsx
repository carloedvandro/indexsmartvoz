
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
    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
      {captureAttempted ? (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-white rounded-full text-black font-medium hover:bg-gray-200 transition-colors"
        >
          Tentar Novamente
        </button>
      ) : (
        <button
          onClick={onCapture}
          disabled={isCapturing}
          className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          <span className="sr-only">Capturar documento</span>
        </button>
      )}
    </div>
  );
};
