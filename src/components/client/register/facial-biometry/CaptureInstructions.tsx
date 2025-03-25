
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext, onBack }: CaptureInstructionsProps) => {
  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-white/10">
            <img 
              src="/lovable-uploads/f4b30617-4032-4f4b-8c3e-ec83632e0240.png" 
              alt="Documento de identificação" 
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold">Olá,</h2>
        <p className="text-base">
          Hora de tirar sua foto de identificação.<br />
          Antes de começar, algumas dicas:
        </p>

        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          <Button onClick={onNext} className="w-full bg-white text-[#8425af] hover:bg-gray-100">
            AVANÇAR
          </Button>
        </div>
      </div>
    </div>
  );
};
