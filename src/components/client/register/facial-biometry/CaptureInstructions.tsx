
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { Camera } from "lucide-react";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext }: CaptureInstructionsProps) => {
  return (
    <div className="bg-white text-gray-800 h-screen flex flex-col overflow-hidden">
      {/* Header with Smartvoz logo - fixed at top */}
      <div className="bg-white px-4 py-2.5 flex-shrink-0">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-20 object-contain"
          />
        </div>
      </div>

      {/* Content area - takes remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Second Smartvoz logo in the middle */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>

        {/* Central icon */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Camera size={48} color="#8425af" strokeWidth={1.5} />
          </div>
          
          {/* Text content */}
          <h2 className="text-base font-medium mb-2 text-gray-800">Olá,</h2>
          <p className="text-xs font-light leading-relaxed text-center text-gray-600">
            Hora de tirar sua foto de identificação.<br />
            Antes de começar, algumas dicas.
          </p>
        </div>
      </div>

      {/* Button fixed at bottom footer */}
      <div className="flex-shrink-0">
        <Button
          onClick={onNext}
          className="w-full h-12 bg-[#8425af] text-white uppercase text-xs font-medium hover:bg-[#7a1fa2] rounded-none"
        >
          AVANÇAR
        </Button>
      </div>
    </div>
  );
};
