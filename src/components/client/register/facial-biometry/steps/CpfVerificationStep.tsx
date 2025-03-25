
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { validateCPF } from "@/utils/cpfValidation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CpfVerificationStepProps {
  onNext: () => void;
}

export const CpfVerificationStep = ({ onNext }: CpfVerificationStepProps) => {
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and format CPF
    const value = e.target.value.replace(/\D/g, "");
    
    // Format CPF as XXX.XXX.XXX-XX
    let formattedValue = value;
    if (value.length > 3) {
      formattedValue = value.replace(/^(\d{3})(\d)/, "$1.$2");
    }
    if (value.length > 6) {
      formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    }
    if (value.length > 9) {
      formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    }
    
    setCpf(formattedValue);
    setError("");
  };

  const handleVerify = async () => {
    const cleanCpf = cpf.replace(/\D/g, "");
    
    if (!validateCPF(cleanCpf)) {
      setError("CPF inválido");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get current user session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast({
          title: "Erro de Autenticação",
          description: "Usuário não está autenticado. Por favor, faça login novamente.",
          variant: "destructive",
        });
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      // Get the user's profile and check if the CPF matches
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("cpf")
        .eq("id", userId)
        .single();
      
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        setError("Erro ao verificar CPF. Por favor, tente novamente.");
        return;
      }
      
      // Check if the CPF matches
      if (!profileData || profileData.cpf !== cleanCpf) {
        setError("CPF não corresponde ao utilizado no cadastro");
        return;
      }
      
      // CPF verified successfully
      toast({
        title: "CPF Verificado",
        description: "Seu CPF foi verificado com sucesso",
      });
      
      onNext();
    } catch (error) {
      console.error("Verification error:", error);
      setError("Erro ao verificar CPF. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Verificação de CPF</h2>
        <p className="text-gray-600 mt-2">
          Por favor, informe seu CPF para verificação
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            className="text-center text-lg"
            maxLength={14}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <Button
          onClick={handleVerify}
          disabled={isLoading || cpf.replace(/\D/g, "").length !== 11}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verificando...
            </>
          ) : (
            "Verificar"
          )}
        </Button>
      </div>
    </div>
  );
};
