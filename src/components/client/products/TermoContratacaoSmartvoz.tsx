
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TermsModal } from "./terms/TermsModal";

interface TermoContratacaoSmartvozProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

const TermoContratacaoSmartvoz = ({ acceptedTerms, onTermsChange }: TermoContratacaoSmartvozProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleTermsLinkClick = () => {
    setIsModalOpen(true);
  };

  const handleModalAccept = (accepted: boolean) => {
    onTermsChange(accepted);
    setIsModalOpen(false);
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
