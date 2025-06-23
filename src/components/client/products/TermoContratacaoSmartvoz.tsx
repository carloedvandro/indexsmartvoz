
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TermsModal } from "./TermsModal";

interface TermoContratacaoSmartvozProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

const TermoContratacaoSmartvoz = ({ acceptedTerms, onTermsChange }: TermoContratacaoSmartvozProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCheckboxChange = (checked: boolean) => {
    console.log('📝 Checkbox alterado:', checked);
    onTermsChange(checked);
  };

  const handleTermsLinkClick = () => {
    setIsModalOpen(true);
  };

  const handleModalAccept = (accepted: boolean) => {
    onTermsChange(accepted);
    toast({
      title: "Sucesso",
      description: "Termos aceitos com sucesso!",
    });
  };

  return (
    <>
      <div className="space-y-6 mt-[90px]">
        <div className="w-full flex justify-center mb-4">
          
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#8425af] mb-4">Termos de contrato</h2>
          <p className="text-gray-600 mb-4" style={{ fontSize: '16.5px' }}>
            Ao concluir a solicitação, você confirma que todos os dados são verdadeiros e estão em perfeita
            conformidade com os{" "}
            <button
              onClick={handleTermsLinkClick}
              className="text-[#8425af] underline hover:text-purple-700"
            >
              termos a seguir
            </button>
            :
          </p>
          
          <div className="flex items-start space-x-2 text-left ml-[12px] mt-6">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-0.5 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer w-[calc(100%+7px)] pl-1 mt-[1.25px]">
              Aceito receber comunicações e ofertas da Smartvoz.
            </label>
          </div>
        </div>
      </div>

      <TermsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleModalAccept}
      />
    </>
  );
};

export default TermoContratacaoSmartvoz;
