
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordManagementProps {
  userId: string;
  showPasswordInput: boolean;
  newPassword: string;
  setNewPassword: (value: string) => void;
  setShowPasswordInput: (value: boolean) => void;
  handleResetPassword: () => Promise<void>;
  handleSetPassword: () => Promise<void>;
  isResettingPassword: boolean;
  isSettingPassword: boolean;
}

export function PasswordManagement({
  userId,
  showPasswordInput,
  newPassword,
  setNewPassword,
  setShowPasswordInput,
  handleResetPassword,
  handleSetPassword,
  isResettingPassword,
  isSettingPassword
}: PasswordManagementProps) {
  if (!userId) return null;

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
