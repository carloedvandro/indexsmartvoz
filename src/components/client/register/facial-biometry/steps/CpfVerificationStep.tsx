import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validatePartialCPF } from "@/utils/validation/cpfValidation";

interface CpfVerificationStepProps {
  onNext: () => void;
}

export const CpfVerificationStep = ({ onNext }: CpfVerificationStepProps) => {
  const [cpfDigits, setCpfDigits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cpfDigits || cpfDigits.length < 5) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira os primeiros 5 dígitos do seu CPF.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulação de verificação do CPF (em produção, isso seria uma chamada de API)
      if (!validatePartialCPF(cpfDigits)) {
        throw new Error("Os dígitos do CPF não são válidos.");
      }
      
      // Adicionar um pequeno atraso para simular processamento
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Se não houver erros, prosseguir para a próxima etapa
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
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-semibold">
          Olá, verificamos que você está realizando a contratação dos nossos serviços.
        </h2>
        <p className="text-lg">
          Para dar continuidade precisamos realizar a sua biometria.
        </p>
        
        <div className="mt-4 text-center">
          <p className="text-sm opacity-80 mb-4">
            Biometria é uma solução que utiliza a tecnologia para identificação do cliente.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-lg font-medium text-center">
              Insira os primeiros 5 dígitos do seu CPF:
            </label>
            <Input
              id="cpf"
              type="text"
              value={cpfDigits}
              onChange={(e) => {
                // Limitar a 5 dígitos e apenas números
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setCpfDigits(value);
              }}
              placeholder="12345"
              className="w-full max-w-xs mx-auto text-black text-center text-lg h-12"
              maxLength={5}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full max-w-xs bg-white text-[#8425af] hover:bg-gray-100"
            disabled={isLoading || cpfDigits.length < 5}
          >
            {isLoading ? "Validando..." : "VALIDAR"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};
