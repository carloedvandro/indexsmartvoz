import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validatePartialCPF } from "@/utils/validation/cpfValidation";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "@/components/ui/image";
import { ShieldCheck } from "lucide-react";

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
                <div className="flex flex-col items-center relative">
                  <span className="text-sm text-white font-normal">Verified by</span>
                  <div className="relative">
                    <span className="font-bold text-sm text-white relative z-10 ml-[2px]">Serasa Experian</span>
                    <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-30">
                      <ShieldCheck 
                        size={128} 
                        color="white" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
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
