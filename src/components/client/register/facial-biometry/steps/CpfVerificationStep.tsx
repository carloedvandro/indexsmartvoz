
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CpfVerificationStepProps {
  onNext: () => void;
}

export const CpfVerificationStep = ({ onNext }: CpfVerificationStepProps) => {
  const [cpfPrefix, setCpfPrefix] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleCpfVerification = async () => {
    if (cpfPrefix.length !== 5) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, insira os primeiros 5 dígitos do seu CPF.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      // Buscar o CPF do usuário logado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("cpf")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (!profile.cpf) {
        throw new Error("CPF não encontrado no cadastro");
      }

      // Verificar se os primeiros 5 dígitos correspondem
      const registeredPrefix = profile.cpf.substring(0, 5);
      
      if (cpfPrefix !== registeredPrefix) {
        toast({
          title: "CPF Inválido",
          description: "Os dígitos informados não correspondem ao CPF cadastrado.",
          variant: "destructive",
        });
        return;
      }

      onNext();
    } catch (error: any) {
      console.error("Erro na verificação do CPF:", error);
      toast({
        title: "Erro na verificação",
        description: error.message || "Ocorreu um erro ao verificar o CPF.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
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
          disabled={cpfPrefix.length !== 5 || isValidating}
        >
          {isValidating ? "Validando..." : "Validar CPF"}
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
