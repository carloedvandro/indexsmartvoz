
interface DocumentFrameProps {
  documentDetected: boolean;
  isBackSide?: boolean;
}

export const DocumentFrame = ({ documentDetected, isBackSide = false }: DocumentFrameProps) => {
  // Use dimensões diferentes para o verso do documento
  const frameSize = isBackSide ? "w-[70%] h-[30%]" : "w-[50%] h-[60%]";
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`relative ${frameSize} border-2 ${
        documentDetected ? 'border-green-500' : 'border-white'
      } border-opacity-80 transition-colors duration-300`}>
        {/* Corner guides - clean rectangular style */}
        <div className="absolute left-0 top-0 w-6 h-1 bg-white"></div>
        <div className="absolute left-0 top-0 w-1 h-6 bg-white"></div>
        
        <div className="absolute right-0 top-0 w-6 h-1 bg-white"></div>
        <div className="absolute right-0 top-0 w-1 h-6 bg-white"></div>
        
        <div className="absolute left-0 bottom-0 w-6 h-1 bg-white"></div>
        <div className="absolute left-0 bottom-0 w-1 h-6 bg-white"></div>
        
        <div className="absolute right-0 bottom-0 w-6 h-1 bg-white"></div>
        <div className="absolute right-0 bottom-0 w-1 h-6 bg-white"></div>

        {/* Centered instruction text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-xs font-light">
          {documentDetected ? "Documento Detectado" : "Encaixe o Documento"}
        </div>
      </div>
    </div>
  );
};
