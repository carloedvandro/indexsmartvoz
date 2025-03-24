
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface UserStatusManagementProps {
  userId: string;
  userEmail: string;
  currentStatus?: string;
}

export function UserStatusManagement({ userId, userEmail, currentStatus }: UserStatusManagementProps) {
  const { toast } = useToast();
  const [isReactivating, setIsReactivating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState(currentStatus || 'pending');

  const handleReactivateUser = async () => {
    if (!userId || !userEmail) {
      toast({
        title: "Erro",
        description: "ID ou email do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsReactivating(true);
    try {
      // Update user status in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          status: "active",
          blocked: false,
          block_reason: null,
          block_date: null
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      // Instead of using 'banned' which doesn't exist, we'll just update user metadata
      // to indicate they are active. The actual auth.user status will be handled through
      // the profiles table which we already updated above.
      const { error: authError } = await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { status: 'active' } }
      );

      if (authError) {
        throw authError;
      }

      toast({
        title: "Sucesso",
        description: "Usuário reativado com sucesso",
      });
      
      setStatus("active");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao reativar usuário",
        variant: "destructive",
      });
    } finally {
      setIsReactivating(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!userEmail) {
      toast({
        title: "Erro",
        description: "Email do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      // Set user as verified in auth system
      const { error } = await supabase.auth.admin.updateUserById(
        userId,
        { email_confirm: true }
      );

      if (error) {
        throw error;
      }

      // Update user verification status in profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          email_verified: true 
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      toast({
        title: "Sucesso",
        description: "Email do usuário verificado com sucesso",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao verificar email",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Status do Usuário</h3>
        <Badge
          variant={status === "active" ? "success" : status === "blocked" ? "destructive" : "outline"}
        >
          {status === "active" ? "Ativo" : status === "blocked" ? "Bloqueado" : "Pendente"}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleReactivateUser}
          disabled={isReactivating || status === "active"}
          className="flex gap-2 items-center"
        >
          {isReactivating && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "active" ? "Usuário Ativo" : "Reativar Usuário"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleVerifyEmail}
          disabled={isVerifying}
          className="flex gap-2 items-center"
        >
          {isVerifying && <Loader2 className="h-4 w-4 animate-spin" />}
          Verificar Email
        </Button>
      </div>
    </div>
  );
}
