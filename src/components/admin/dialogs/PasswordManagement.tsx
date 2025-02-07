
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminResetPassword, adminSetUserPassword } from "../UserFormUtils";
import { updateProfile } from "@/services/user/userUpdate";

interface PasswordManagementProps {
  user: any;
  initialPassword: string;
  setInitialPassword: (password: string) => void;
}

export function PasswordManagement({ 
  user, 
  initialPassword,
  setInitialPassword 
}: PasswordManagementProps) {
  const { toast } = useToast();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!user?.email) {
      toast({
        title: "Erro",
        description: "Email do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      await adminResetPassword(user.email);
      toast({
        title: "Sucesso",
        description: "Email com instruções de redefinição de senha enviado para o usuário",
      });
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

    if (!user?.id) {
      toast({
        title: "Erro",
        description: "ID do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSettingPassword(true);
    try {
      await adminSetUserPassword(user.id, newPassword);
      await updateProfile(user.id, {
        ...user,
        initial_password: newPassword
      });
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso",
      });
      setNewPassword("");
      setInitialPassword(newPassword);
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
        <div className="flex flex-col gap-2 mb-4">
          <Label>Senha do Usuário</Label>
          {initialPassword ? (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={initialPassword}
                readOnly
                className="bg-gray-100 font-medium text-base"
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(initialPassword);
                  toast({
                    description: "Senha copiada para a área de transferência",
                  });
                }}
              >
                Copiar
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma senha inicial definida</p>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input
              id="new-password"
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a nova senha"
            />
          </div>
          <div className="flex gap-2 self-end">
            <Button
              type="button"
              onClick={handleSetPassword}
              disabled={isSettingPassword}
            >
              {isSettingPassword ? "Salvando..." : "Salvar Senha"}
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
        </div>
      </div>
    </div>
  );
}
