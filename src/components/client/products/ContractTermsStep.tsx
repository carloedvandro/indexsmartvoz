
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TermsModal } from "./TermsModal";

interface ContractTermsStepProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

export function ContractTermsStep({
  acceptedTerms,
  onTermsChange
}: ContractTermsStepProps) {
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <div className="space-y-6 mt-[90px]">
      <div className="w-full flex justify-center mb-4">
        
      </div>
      
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#8425af] mb-4">Termos de contrato</h2>
        <p className="text-gray-600 mb-4" style={{ fontSize: '16.5px' }}>
          Ao concluir a solicitação, você confirma que todos os dados são verdadeiros e estão em perfeita
          conformidade com os termos a seguir:
        </p>
        <div className="space-y-2 mb-6">
          <button 
            onClick={() => setShowTermsModal(true)}
            className="text-black hover:underline cursor-pointer"
          >
            Termo de Serviço Móvel Pessoal.
          </button>
        </div>
        
        <div className="flex items-start space-x-2 text-left ml-[12px]">
          <Checkbox 
            id="terms" 
            checked={acceptedTerms} 
            onCheckedChange={(checked) => {
              console.log('📝 Checkbox alterado:', checked);
              onTermsChange(checked as boolean);
            }} 
            className="mt-0.5" 
          />
          <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer w-[calc(100%+7px)] pl-1 mt-[1.25px]">
            Aceito receber comunicações e ofertas da Smartvoz.
          </label>
        </div>
      </div>

      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </div>
  );
}
