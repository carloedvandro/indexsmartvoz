
import { useState } from "react";

interface DocumentFrameProps {
  documentDetected: boolean;
}

export const DocumentFrame = ({ documentDetected }: DocumentFrameProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`relative w-[85%] h-[80%] border ${
        documentDetected ? 'border-green-500' : 'border-white'
      } border-opacity-70 transition-colors duration-300`}>
        {/* Corner guides - more minimal */}
        <div className="absolute left-0 top-0 w-5 h-1 bg-white"></div>
        <div className="absolute left-0 top-0 w-1 h-5 bg-white"></div>
        
        <div className="absolute right-0 top-0 w-5 h-1 bg-white"></div>
        <div className="absolute right-0 top-0 w-1 h-5 bg-white"></div>
        
        <div className="absolute left-0 bottom-0 w-5 h-1 bg-white"></div>
        <div className="absolute left-0 bottom-0 w-1 h-5 bg-white"></div>
        
        <div className="absolute right-0 bottom-0 w-5 h-1 bg-white"></div>
        <div className="absolute right-0 bottom-0 w-1 h-5 bg-white"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-xs">
          {documentDetected ? "Documento Detectado" : "Encaixe o Documento"}
        </div>
      </div>
    </div>
  );
};
