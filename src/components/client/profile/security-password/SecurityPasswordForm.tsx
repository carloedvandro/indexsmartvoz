
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { updateProfile } from "@/services/user/userUpdate";
import { PasswordRequirements } from "./PasswordRequirements";

const securityPasswordSchema = z.object({
  currentBackofficePassword: z.string().optional(),
  currentSecurityPassword: z.string().optional(),
  newSecurityPassword: z.string().min(8, "Nova senha de segurança deve ter pelo menos 8 caracteres"),
  confirmSecurityPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.newSecurityPassword === data.confirmSecurityPassword, {
  message: "Senha e Confirmar senha precisam ser iguais",
  path: ["confirmSecurityPassword"],
});

type SecurityPasswordFormData = z.infer<typeof securityPasswordSchema>;

export function SecurityPasswordForm() {
  const { toast } = useToast();
  const { data: profile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentBackoffice, setShowCurrentBackoffice] = useState(false);
  const [showCurrentSecurity, setShowCurrentSecurity] = useState(false);
  const [showNewSecurity, setShowNewSecurity] = useState(false);
  const [showConfirmSecurity, setShowConfirmSecurity] = useState(false);

  const form = useForm<SecurityPasswordFormData>({
    resolver: zodResolver(securityPasswordSchema),
    defaultValues: {
      currentBackofficePassword: "",
      currentSecurityPassword: "",
      newSecurityPassword: "",
      confirmSecurityPassword: "",
    },
  });

  const handleRecoverSecurity = () => {
    toast({
      title: "Recuperação de senha",
      description: "Um email de recuperação foi enviado para seu endereço cadastrado.",
    });
  };

  const onSubmit = async (data: SecurityPasswordFormData) => {
    if (!profile) return;

    setIsSubmitting(true);
    try {
      await updateProfile(profile.id, {
        security_password: data.newSecurityPassword,
      });

      toast({
        title: "Sucesso",
        description: "Senha de segurança alterada com sucesso!",
      });

      form.reset();
    } catch (error: any) {
      console.error("Erro ao alterar senha de segurança:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível alterar a senha de segurança.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const newSecurityPassword = form.watch("newSecurityPassword");

  return (
    <>
      <Button 
        onClick={handleRecoverSecurity}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white"
      >
        🔄 Recuperar senha de segurança
      </Button>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentBackofficePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha atual (Backoffice)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentBackoffice ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentBackoffice(!showCurrentBackoffice)}
                        >
                          {showCurrentBackoffice ? (
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
                name="currentSecurityPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha de segurança atual</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentSecurity ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentSecurity(!showCurrentSecurity)}
                        >
                          {showCurrentSecurity ? (
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
                name="newSecurityPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha de segurança</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewSecurity ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewSecurity(!showNewSecurity)}
                        >
                          {showNewSecurity ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <PasswordRequirements password={newSecurityPassword} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmSecurityPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a nova senha de segurança</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmSecurity ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmSecurity(!showConfirmSecurity)}
                        >
                          {showConfirmSecurity ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    {form.formState.errors.confirmSecurityPassword && (
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
    </>
  );
}
