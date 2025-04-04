
import { Button } from "@/components/ui/button";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext }: CaptureInstructionsProps) => {
  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg relative">
      {/* Corner guide dots */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/80"></div>
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white/80"></div>
      
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 rounded-full bg-white/20 w-20 h-20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/2c39fd8d-902c-4e73-b9da-e5e7ff47b0ce.png" 
              alt="Face outline with phone" 
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-medium">Olá,</h2>
        <p className="text-sm mt-2">
          Hora de tirar sua foto de identificação.<br />
          Antes de começar, algumas dicas:
        </p>

        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-5 h-1 bg-white rounded"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <Button 
            onClick={onNext} 
            variant="outline" 
            className="w-full bg-transparent border-white text-white hover:bg-white/10 hover:text-white uppercase"
          >
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
};
