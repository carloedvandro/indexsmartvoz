
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Check, 
  XCircle, 
  MailPlus,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface UserStatusManagementProps {
  user: any;
  onUserUpdated: () => void;
}

export function UserStatusManagement({ user, onUserUpdated }: UserStatusManagementProps) {
  const { toast } = useToast();
  const [isActivating, setIsActivating] = useState(false);
  const [isSendingEmailVerification, setIsSendingEmailVerification] = useState(false);

  const isUserBanned = user?.auth_banned === true;
  const isEmailConfirmed = !!user?.auth_confirmed_at;

  const handleToggleUserStatus = async () => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "ID do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsActivating(true);
    try {
      // Get auth user metadata
      const { data: adminData } = await supabase.auth.getUser();
      
      if (!adminData?.user || !adminData.user.id) {
        throw new Error("Admin não autenticado");
      }

      // Call updateUserById with the correct properties structure
      const { error } = await supabase.auth.admin.updateUserById(
        user.id, 
        { 
          user_metadata: {
            ...user.raw_user_meta_data,
            admin_updated_at: new Date().toISOString(),
            admin_updated_by: adminData.user.id,
            banned_status: !isUserBanned // Store banned status in metadata instead
          },
        }
      );

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: isUserBanned 
          ? "Usuário reativado com sucesso" 
          : "Usuário desativado com sucesso",
      });
      
      onUserUpdated();
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar status do usuário",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  const handleSendEmailVerification = async () => {
    if (!user?.email) {
      toast({
        title: "Erro",
        description: "Email do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmailVerification(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Email de verificação enviado com sucesso",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar email de verificação",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmailVerification(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium">Status da Conta</h3>
        
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Status:</span>
          <Badge variant={isUserBanned ? "destructive" : "success"}>
            {isUserBanned ? "Desativado" : "Ativo"}
          </Badge>
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Email verificado:</span>
          <Badge variant={isEmailConfirmed ? "success" : "outline"}>
            {isEmailConfirmed ? "Verificado" : "Não verificado"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant={isUserBanned ? "default" : "destructive"}
          size="sm"
          onClick={handleToggleUserStatus}
          disabled={isActivating}
        >
          {isActivating ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : isUserBanned ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          {isUserBanned ? "Reativar Usuário" : "Desativar Usuário"}
        </Button>

        {!isEmailConfirmed && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSendEmailVerification}
            disabled={isSendingEmailVerification}
          >
            {isSendingEmailVerification ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MailPlus className="mr-2 h-4 w-4" />
            )}
            Enviar Email de Verificação
          </Button>
        )}
      </div>
    </div>
  );
}
