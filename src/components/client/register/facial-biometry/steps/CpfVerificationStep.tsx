
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
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-5">
        <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            Termos de Validação
          </h2>
          
          <div className="text-white/90 text-sm text-justify mb-6 leading-relaxed">
            <p className="mb-4">
              Ao prosseguir com o processo de verificação biométrica e documental, você concorda em fornecer seus dados para análise automatizada por IA. A coleta de imagens, documentos e dados pessoais é protegida por nossa política de privacidade.
            </p>
            <p className="mb-4">
              Digite os 5 primeiros dígitos do seu CPF para confirmar a leitura e seguir para a biometria:
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input 
                id="cpf" 
                type="text" 
                value={cpfDigits} 
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                  setCpfDigits(value);
                }} 
                placeholder="12345" 
                className="w-full h-12 text-black text-center text-lg bg-white border-0 rounded-lg" 
                maxLength={5} 
              />
            </div>

            <Button 
              type="submit"
              disabled={!isButtonEnabled} 
              className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-primary font-bold text-lg rounded-lg transition-colors"
            >
              {isLoading ? "VALIDANDO..." : "Prosseguir"}
            </Button>

            {cpfDigits.length > 0 && cpfDigits.length < 5 && (
              <p className="text-red-400 text-sm text-center">
                CPF inválido. Digite os 5 primeiros dígitos corretamente.
              </p>
            )}
          </form>

          <p className="text-white/80 text-xs text-center mt-4">
            Ao continuar, você aceita nossos{' '}
            <button 
              onClick={handleTermsClick}
              className={`underline font-medium ${
                shouldHighlightTerms 
                  ? 'text-yellow-400 animate-pulse' 
                  : 'text-yellow-300'
              }`}
              type="button"
            >
              termos de uso
            </button>
          </p>

          {/* Verified by section */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-white/80" strokeWidth={2} />
                <div className="h-6 w-[1px] bg-white/40 mr-2"></div>
              </div>
              <div className="text-start">
                <div className="text-xs text-yellow-300">Verified by</div>
                <div className="font-semibold text-sm text-white">Serasa Experian</div>
              </div>
            </div>
          </div>
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
