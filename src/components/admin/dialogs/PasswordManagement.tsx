
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminResetPassword, adminSetUserPassword } from "@/services/user/userReset";

interface PasswordManagementProps {
  userId: string;
  userEmail: string;
}

export function PasswordManagement({ userId, userEmail }: PasswordManagementProps) {
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
    } catch (error: any) {
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
    <div className="flex flex-col gap-4 px-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPasswordInput(!showPasswordInput)}
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
        
        {showPasswordInput && (
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite a nova senha"
              />
            </div>
            <Button
              type="button"
              onClick={handleSetPassword}
              disabled={isSettingPassword}
            >
              {isSettingPassword ? "Salvando..." : "Salvar Senha"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
