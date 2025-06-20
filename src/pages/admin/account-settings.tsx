
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Settings } from "lucide-react";
import { validatePasswordStrength } from "@/utils/passwordValidation";

interface EmailFormData {
  email: string;
  confirmEmail: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AdminAccountSettings() {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const emailForm = useForm<EmailFormData>();
  const passwordForm = useForm<PasswordFormData>();

  const handleUpdateEmail = async (data: EmailFormData) => {
    if (data.email !== data.confirmEmail) {
      toast({
        title: "Erro",
        description: "Os emails não coincidem",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: data.email,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Um email de confirmação foi enviado para o novo endereço. Verifique sua caixa de entrada.",
      });

      emailForm.reset();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar email",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleUpdatePassword = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    const validation = validatePasswordStrength(data.newPassword);
    if (!validation.isValid) {
      toast({
        title: "Erro",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      // Primeiro, verificar a senha atual fazendo login
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        throw new Error("Usuário não encontrado");
      }

      // Tentar fazer login com a senha atual para verificar
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: data.currentPassword,
      });

      if (signInError) {
        toast({
          title: "Erro",
          description: "Senha atual incorreta",
          variant: "destructive",
        });
        return;
      }

      // Atualizar a senha
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Senha atualizada com sucesso",
      });

      passwordForm.reset();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar senha",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header administrativo simples */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600">Configurações da conta do administrador</p>
            </div>
            <div className="text-sm text-gray-500">
              Área restrita - Administrador
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto p-8">
        <AdminPageHeader
          title="Configurações da Conta"
          subtitle="Gerencie suas informações de login administrativo"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção de Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Atualizar Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={emailForm.handleSubmit(handleUpdateEmail)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Novo Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...emailForm.register("email", { required: "Email é obrigatório" })}
                    placeholder="novo@email.com"
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">Confirmar Novo Email</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    {...emailForm.register("confirmEmail", { required: "Confirmação é obrigatória" })}
                    placeholder="novo@email.com"
                  />
                  {emailForm.formState.errors.confirmEmail && (
                    <p className="text-red-500 text-sm">
                      {emailForm.formState.errors.confirmEmail.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isUpdatingEmail}
                >
                  {isUpdatingEmail ? "Atualizando..." : "Atualizar Email"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Seção de Senha */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Atualizar Senha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...passwordForm.register("currentPassword", { required: "Senha atual é obrigatória" })}
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      {...passwordForm.register("newPassword", { required: "Nova senha é obrigatória" })}
                      placeholder="Digite sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...passwordForm.register("confirmPassword", { required: "Confirmação é obrigatória" })}
                      placeholder="Confirme sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  <p>A senha deve conter:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Pelo menos 8 caracteres</li>
                    <li>Letras maiúsculas e minúsculas</li>
                    <li>Números</li>
                    <li>Caracteres especiais</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Atualizando..." : "Atualizar Senha"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
