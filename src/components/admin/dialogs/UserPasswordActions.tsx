
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { adminResetPassword, adminSetUserPassword } from "@/services/user/userReset";

interface UserPasswordActionsProps {
  userId: string | null;
  userEmail: string | null;
}

export function UserPasswordActions({ userId, userEmail }: UserPasswordActionsProps) {
  const { toast } = useToast();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!userEmail) {
      toast({
        title: "Erro",
        description: "Email do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      await adminResetPassword(userEmail);
      toast({
        title: "Sucesso",
        description: "Email com instruções de redefinição de senha enviado para o usuário",
      });
      setShowPasswordInput(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao resetar senha",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleSetPassword = async () => {
    if (!newPassword) {
      toast({
        title: "Erro",
        description: "Digite a nova senha",
        variant: "destructive",
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Erro",
        description: "ID do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSettingPassword(true);
    try {
      await adminSetUserPassword(userId, newPassword);
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso",
      });
      setShowPasswordInput(false);
      setNewPassword("");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao definir nova senha",
        variant: "destructive",
      });
    } finally {
      setIsSettingPassword(false);
    }
  };

  return (
    <div className="space-y-4 mt-4 border-t pt-4">
      <h3 className="font-medium">Ações de Senha</h3>
      
      {!showPasswordInput ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPasswordInput(true)}
            disabled={isResettingPassword}
          >
            Definir Nova Senha
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleResetPassword}
            disabled={isResettingPassword}
          >
            {isResettingPassword ? "Enviando..." : "Enviar Email de Reset"}
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova senha"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="default"
              onClick={handleSetPassword}
              disabled={isSettingPassword}
            >
              {isSettingPassword ? "Definindo..." : "Definir Senha"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowPasswordInput(false);
                setNewPassword("");
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
