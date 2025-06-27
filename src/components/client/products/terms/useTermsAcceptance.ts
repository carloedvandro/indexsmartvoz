
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseTermsAcceptanceProps {
  onAccept?: (accepted: boolean) => void;
  onClose: () => void;
}

export function useTermsAcceptance({ onAccept, onClose }: UseTermsAcceptanceProps) {
  const [aceito, setAceito] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleAceite = async () => {
    try {
      setEnviando(true);
      
      console.log('🔄 Tentando registrar aceite dos termos...');
      
      // Verificar se o usuário está logado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuário não está logado');
      }

      console.log('✅ Usuário logado, enviando aceite...');
      
      // Registrar aceite via Edge Function
      const { data, error } = await supabase.functions.invoke('registro-termo', {
        body: {
          aceite: true,
          receberComunicados: true
        }
      });

      console.log('📤 Resposta da função:', { data, error });

      if (error) {
        console.error('❌ Erro na função:', error);
        throw error;
      }

      console.log('✅ Aceite registrado com sucesso');
      
      toast({
        title: "Sucesso",
        description: "Aceite registrado com sucesso.",
      });
      
      if (onAccept) {
        onAccept(true);
      }
      
      onClose();
    } catch (error) {
      console.error('❌ Erro ao registrar aceite:', error);
      toast({
        title: "Erro",
        description: "Erro ao registrar o aceite. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  return {
    aceito,
    setAceito,
    enviando,
    handleAceite
  };
}
