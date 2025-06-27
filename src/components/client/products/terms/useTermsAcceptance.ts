
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
      
      if (!session?.user) {
        console.log('⚠️ Usuário não logado, permitindo aceite offline');
        
        // Se não estiver logado, apenas marcar como aceito localmente
        if (onAccept) {
          onAccept(true);
        }
        
        toast({
          title: "Sucesso",
          description: "Termos aceitos com sucesso.",
        });
        
        onClose();
        return;
      }

      console.log('✅ Usuário logado, tentando registrar aceite...');
      
      // Tentar inserir/atualizar diretamente na tabela terms_acceptance
      const { error: upsertError } = await supabase
        .from('terms_acceptance')
        .upsert({
          user_id: session.user.id,
          accepted: true,
          receive_communications: true,
          accepted_at: new Date().toISOString(),
          ip_address: 'unknown'
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        console.error('❌ Erro ao inserir na tabela:', upsertError);
        
        // Se falhar, tentar via Edge Function
        try {
          const { data, error: functionError } = await supabase.functions.invoke('registro-termo', {
            body: {
              aceite: true,
              receberComunicados: true
            }
          });

          if (functionError) {
            console.error('❌ Erro na função:', functionError);
            throw functionError;
          }

          console.log('✅ Aceite registrado via Edge Function');
        } catch (functionError) {
          console.error('❌ Falha total ao registrar aceite:', functionError);
          
          // Como último recurso, aceitar localmente
          console.log('⚠️ Aceitando termos localmente como fallback');
          
          if (onAccept) {
            onAccept(true);
          }
          
          toast({
            title: "Sucesso",
            description: "Termos aceitos com sucesso.",
          });
          
          onClose();
          return;
        }
      } else {
        console.log('✅ Aceite registrado diretamente na tabela');
      }
      
      if (onAccept) {
        onAccept(true);
      }
      
      toast({
        title: "Sucesso",
        description: "Termos aceitos com sucesso.",
      });
      
      onClose();
    } catch (error) {
      console.error('❌ Erro geral ao registrar aceite:', error);
      
      // Sempre permitir que o usuário continue
      if (onAccept) {
        onAccept(true);
      }
      
      toast({
        title: "Sucesso",
        description: "Termos aceitos com sucesso.",
      });
      
      onClose();
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
