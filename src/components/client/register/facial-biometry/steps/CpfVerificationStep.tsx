
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validatePartialCPF } from "@/utils/validation/cpfValidation";
import { Lock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { TermsModal } from "@/components/client/products/terms/TermsModal";

interface CpfVerificationStepProps {
  onNext: () => void;
}

export const CpfVerificationStep = ({
  onNext
}: CpfVerificationStepProps) => {
  const [cpfDigits, setCpfDigits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpfDigits || cpfDigits.length < 5) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira os primeiros 5 dígitos do seu CPF/CNPJ.",
        variant: "destructive"
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Termos não aceitos",
        description: "Por favor, aceite os termos de uso para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      if (!validatePartialCPF(cpfDigits)) {
        throw new Error("Os dígitos do CPF não são válidos.");
      }
      await new Promise(resolve => setTimeout(resolve, 800));
      onNext();
    } catch (error: any) {
      toast({
        title: "Erro na verificação",
        description: error.message || "Ocorreu um erro ao verificar o CPF.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  const handleTermsAccept = (accepted: boolean) => {
    setIsTermsModalOpen(false);
    if (accepted) {
      setTermsAccepted(true);
      toast({
        title: "Sucesso",
        description: "Termos aceitos com sucesso!",
      });
    }
  };

  // Verificar se o botão deve estar habilitado
  const isButtonEnabled = termsAccepted && cpfDigits.length >= 5 && !isLoading;
  
  // Verificar se deve destacar o link dos termos
  const shouldHighlightTerms = cpfDigits.length >= 5 && !termsAccepted;

  return (
    <>
      <div className="bg-white text-gray-800 flex flex-col ">
        <div className="flex-1 flex items-start justify-center p-6" style={{ paddingTop: '-8px' }}>
          <div className="w-full max-w-[280px] bg-transparent rounded-lg space-y-3">
            <h2 className="text-sm text-gray-800 max-w-[280px] mx-auto text-center">
              Olá, verificamos que você está realizando a
              <br />
              consulta/contratação dos nossos serviços SmartVoz.
              <br />
              Vamos tirar uma foto do seu rosto pra sua segurança.
              <br />
              Para dar continuidade precisamos realizar a sua biometria.
            </h2>

            <p className="text-sm text-gray-600 text-center mt-0 max-w-[280px] mx-auto">
              Biometria é uma solução que utiliza a tecnologia para identificação do cliente.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="cpf" className="block text-xs font-bold text-center text-gray-800">
                  Insira os primeiros 5 dígitos do seu CPF:
                </label>
                <Input 
                  id="cpf" 
                  type="text" 
                  value={cpfDigits} 
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setCpfDigits(value);
                  }} 
                  placeholder="" 
                  className="w-full h-9 text-black text-center text-base bg-white border border-gray-300" 
                  maxLength={5} 
                />
              </div>
            </form>
          </div>
        </div>

        {/* Botão fixado na parte inferior com o conjunto "Verified by" acima */}
        <div className="fixed bottom-0 left-0 right-0 bg-white">
          <div className="flex justify-center py-3">
            <div className="flex items-center bg-transparent py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-gray-600" strokeWidth={2.5} />
                <div className="h-8 w-[1px] bg-gray-400 mr-2"></div>
              </div>
              <div className="text-start ">
                <div className="text-sm text-[#8425af] block">Verified by</div>
                <div className="font-semibold text-sm  text-gray-800">Serasa Experian</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center pb-2">
            Ao continuar, você aceita nossos{' '}
            <button 
              onClick={handleTermsClick}
              className={`underline font-medium ${
                shouldHighlightTerms 
                  ? 'text-red-600 animate-pulse' 
                  : 'text-[#2400ff]'
              }`}
              type="button"
            >
              termos de uso
            </button>
          </p>
          <Button 
            onClick={handleSubmit} 
            disabled={!isButtonEnabled} 
            className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "VALIDANDO..." : "VALIDAR"}
          </Button>
        </div>
      </div>

      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={handleTermsAccept}
      />
    </>
  );
};

export default CpfVerificationStep;
