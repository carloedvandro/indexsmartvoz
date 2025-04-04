
import { Button } from "@/components/ui/button";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext }: CaptureInstructionsProps) => {
  return (
    <div className="bg-[#8425af] text-white min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      {/* Corner dots - pequenos pontos nas extremidades */}
      <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white/80"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Icon */}
        <div className="mb-8 mt-16">
          <img 
            src="/lovable-uploads/e45f8e6f-600e-4e88-b663-676cf6a63ec4.png" 
            alt="Face outline with phone" 
            className="h-12 w-12 object-contain"
          />
        </div>
        
        {/* Text content - texto centralizado */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-normal mb-2">Olá,</h2>
          <p className="text-sm">
            Hora de tirar sua foto de identificação.<br />
            Antes de começar, algumas dicas:
          </p>
        </div>
        
        {/* Progress dots - indicadores de progresso horizontais */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-5 h-1 bg-white rounded-sm"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
        </div>
      </div>

      {/* Button - botão branco com texto preto no rodapé */}
      <div className="w-full mt-auto">
        <Button 
          onClick={onNext} 
          className="w-full bg-white text-black hover:bg-white/90 rounded-none h-14 uppercase text-sm font-medium"
        >
          Avançar
        </Button>
      </div>
    </div>
  );
};
