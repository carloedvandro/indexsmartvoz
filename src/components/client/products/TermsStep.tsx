
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsStepProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  handleBack: () => void;
  handleContinue: () => void;
}

export function TermsStep({ 
  acceptedTerms, 
  setAcceptedTerms, 
  handleBack, 
  handleContinue 
}: TermsStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-[340px] mx-auto w-full px-2 py-5">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Termos e condições</h2>
        <p className="text-gray-600">
          Leia e aceite os termos antes de finalizar seu pedido
        </p>
      </div>

      <div className="space-y-4 w-full">
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-4">
          <p>
            Ao prosseguir, você concorda com os termos de uso e política de privacidade.
          </p>
          <p>
            A ativação das linhas está sujeita à análise e aprovação.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)} 
          />
          <label 
            htmlFor="terms" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Eu li e concordo com os termos e condições
          </label>
        </div>
      </div>
      
      <div className="flex justify-between mt-6 gap-2 w-full">
        <Button 
          variant="outline"
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white w-full"
          onClick={handleBack}
        >
          Voltar
        </Button>
        <Button 
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white w-full"
          onClick={handleContinue}
          disabled={!acceptedTerms}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
