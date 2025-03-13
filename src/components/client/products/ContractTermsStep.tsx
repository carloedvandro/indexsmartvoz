
import { Checkbox } from "@/components/ui/checkbox";

interface ContractTermsStepProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

export function ContractTermsStep({ acceptedTerms, onTermsChange }: ContractTermsStepProps) {
  return (
    <div className="space-y-6">
      <div className="w-full flex justify-center mb-4">
        <img 
          src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
          alt="Smartvoz Logo" 
          className="h-[140px] object-contain mix-blend-multiply opacity-90 contrast-125"
        />
      </div>
      
      <div className="text-center">
        <h2 className="text-xl font-medium text-[#8425af] mb-4">Termos de contrato</h2>
        <p className="text-gray-600 mb-4">
          Ao concluir a solicitação, você confirma que todos os dados são verdadeiros e estão em perfeita
          conformidade com os termos a seguir:
        </p>
        <div className="space-y-2 mb-6">
          <a 
            href="#" 
            className="text-[#8425af] hover:underline"
          >
            Termo de Serviço Móvel Pessoal.
          </a>
        </div>
        
        <div className="flex items-start space-x-2 text-left">
          <Checkbox 
            id="terms" 
            checked={acceptedTerms}
            onCheckedChange={(checked) => onTermsChange(checked as boolean)}
            className="mt-0.5"
          />
          <label 
            htmlFor="terms" 
            className="text-xs text-gray-600 cursor-pointer w-[calc(100%-27px)] mt-1"
          >
            Aceito receber comunicações e ofertas da Smartvoz.
          </label>
        </div>
      </div>
    </div>
  );
}
