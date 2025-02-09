
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CpfVerificationStepProps {
  onNext: () => void;
}

export const CpfVerificationStep = ({ onNext }: CpfVerificationStepProps) => {
  const [cpfPrefix, setCpfPrefix] = useState('');
  const { toast } = useToast();

  const handleCpfVerification = () => {
    if (cpfPrefix.length !== 5) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, insira os primeiros 5 dígitos do seu CPF.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Verificação Biométrica</h2>
      <p className="text-center text-gray-600">
        Insira os primeiros 5 dígitos do seu CPF para iniciar
      </p>
      <div className="max-w-xs mx-auto space-y-4">
        <Input
          type="number"
          placeholder="XXXXX"
          maxLength={5}
          value={cpfPrefix}
          onChange={(e) => setCpfPrefix(e.target.value.slice(0, 5))}
          className="text-center text-lg"
        />
        <Button 
          onClick={handleCpfVerification}
          className="w-full"
          disabled={cpfPrefix.length !== 5}
        >
          Validar CPF
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
