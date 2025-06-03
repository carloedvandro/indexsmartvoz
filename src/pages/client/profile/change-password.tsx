
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { validatePasswordStrength } from "@/utils/passwordValidation";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string().min(8, "Nova senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senha e Confirmar senha precisam ser iguais",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ClientChangePassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true);
    try {
      // Validar força da senha
      const validation = validatePasswordStrength(data.newPassword);
      if (!validation.isValid) {
        toast({
          title: "Erro",
          description: validation.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso!",
      });

      form.reset();
    } catch (error: any) {
      console.error("Erro ao alterar senha:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível alterar a senha.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const newPassword = form.watch("newPassword");
  const passwordValidation = newPassword ? validatePasswordStrength(newPassword) : null;

  const passwordRequirements = [
    { text: "Mínimo de 8 caracteres", valid: newPassword.length >= 8 },
    { text: "Ao menos 1 letra maiúscula", valid: /[A-Z]/.test(newPassword) },
    { text: "Ao menos 1 letra minúscula", valid: /[a-z]/.test(newPassword) },
    { text: "Ao menos 1 número", valid: /\d/.test(newPassword) },
    { text: "Ao menos 1 caractere especial", valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KeyRound className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">MEUS DADOS</p>
              <h1 className="text-2xl font-bold text-gray-900">Alterar Senha</h1>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            ← Voltar
          </Button>
        </div>

        {/* Tabs de navegação */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
            <Button className="bg-teal-500 text-white px-4 py-2 rounded-md">
              🔐 Alterar Senha
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/security-password")}
            >
              🛡️ Senha de Segurança
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/two-factor")}
            >
              🔒 Autenticação de Dois Fatores
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/configurations")}
            >
              ⚙️ Configurações
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha atual</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showCurrentPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showNewPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      {newPassword && (
                        <div className="mt-2 space-y-1">
                          {passwordRequirements.map((req, index) => (
                            <div key={index} className={`text-sm flex items-center gap-2 ${req.valid ? 'text-green-600' : 'text-red-500'}`}>
                              <span>{req.valid ? '✓' : '✗'}</span>
                              {req.text}
                            </div>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme a nova senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      {form.formState.errors.confirmPassword && (
                        <div className="text-sm text-red-500 mt-1">
                          ✗ Senha e Confirmar senha precisam ser iguais
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                  >
                    {isSubmitting ? "Alterando..." : "Alterar senha"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
