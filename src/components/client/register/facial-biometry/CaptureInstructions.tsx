
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { Camera } from "lucide-react";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext }: CaptureInstructionsProps) => {
  return (
    <div className="bg-[#8425af] text-white min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      {/* Corner dots - tiny white dots in corners */}
      <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Central icon */}
        <div className="flex flex-col items-center">
          <div className="bg-white/10 p-8 rounded-full mb-6 backdrop-blur-sm">
            <Camera size={64} color="white" strokeWidth={1.5} />
          </div>
          
          {/* Text content */}
          <h2 className="text-base font-light mb-2">Olá,</h2>
          <p className="text-xs font-light leading-relaxed text-center">
            Hora de tirar sua foto de identificação.<br />
            Antes de começar, algumas dicas.
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center space-x-2 mb-10">
        <div className="w-4 h-1 bg-white"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* Button at bottom */}
      <button
        onClick={onNext}
        className="w-full h-12 bg-white text-black uppercase text-xs font-medium"
      >
        AVANÇAR
      </button>
    </div>
  );
};
