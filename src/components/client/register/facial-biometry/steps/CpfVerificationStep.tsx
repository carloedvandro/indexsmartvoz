import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validatePartialCPF } from "@/utils/validation/cpfValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { Lock } from 'lucide-react';
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
    <div className="min-h-screen bg-[#8425af] text-white pt-[54px] flex items-center justify-center p-6">
      <div className="w-full max-w-[320px] bg-[#8425af] rounded-lg space-y-6">
        <Image 
          src="/lovable-uploads/adf6e7ac-29f8-4ffe-abbf-45db71f86250.png" 
          alt="SmartVoz Logo" 
          className="max-w-[220px] max-h-[88px] object-contain mx-auto mb-12"
        />

        <h2 className="text-xs font-bold text-white max-w-[320px] mx-auto text-center">
          Olá, verificamos que você está realizando a 
          <br />
          consulta/contratação dos nossos serviços SmartVoz.
          <br />
          Para dar continuidade precisamos realizar a sua biometria.
        </h2>
        
        <p className="text-xs opacity-80 text-white text-center mt-4 max-w-[319px] mx-auto">
          Biometria é uma solução que utiliza a tecnologia para identificação do cliente.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-xs font-bold text-center text-white">
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

          <div className="flex justify-center mt-16">
            <div className="flex items-center bg-[#8425af] px-4 py-2 rounded-lg relative">
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center">
                  <div className="h-5 w-[1px] bg-white mr-2"></div>
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex flex-col items-center relative">
                  <span className="text-sm text-white font-normal">Verified by</span>
                  <span className="font-bold text-sm text-white relative z-10 ml-[2px]">Serasa Experian</span>
                  <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-30">
                    <Image 
                      src="/lovable-uploads/b08196be-7b0e-452e-ab09-ba7b0ff37552.png" 
                      alt="Security Shield" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
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

export default CpfVerificationStep;
