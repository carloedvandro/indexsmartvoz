import { Button } from "@/components/ui/button";

interface DocumentInstructionsStepProps {
  onContinue: () => void;
}

export function DocumentInstructionsStep({ onContinue }: DocumentInstructionsStepProps) {
  return (
    <div className="space-y-6 text-center">
      <h3 className="text-lg font-semibold">Agora, vamos fotografar seu documento</h3>
      <p className="text-gray-600">
        Prepare seu RG ou CNH para fotografar a frente e o verso
      </p>
      <Button 
        onClick={onContinue} 
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Continuar
      </Button>
    </div>
  );
}