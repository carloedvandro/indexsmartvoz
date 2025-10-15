import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus } from "lucide-react";

export function QuickUserCreate() {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const createTestUser = async () => {
    setIsCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: 'sac@bettatec.com.br',
          password: 'Vivo@2545',
          fullName: 'SAC Bettatec',
          role: 'client'
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Sucesso!",
          description: "Usuário sac@bettatec.com.br criado. Você já pode fazer login!",
          duration: 5000,
        });
      } else {
        throw new Error(data.error || 'Erro ao criar usuário');
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar usuário de teste",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={createTestUser}
        disabled={isCreating}
        className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        {isCreating ? "Criando usuário..." : "Criar usuário sac@bettatec.com.br"}
      </Button>
      <p className="text-xs text-gray-500 text-center mt-2">
        Ferramenta de desenvolvimento - Cria o usuário com senha Vivo@2545
      </p>
    </div>
  );
}
