
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface EmailFormData {
  email: string;
  confirmEmail: string;
}

export function EmailUpdateForm() {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<EmailFormData>();

  const handleUpdateEmail = async (data: EmailFormData) => {
    if (data.email !== data.confirmEmail) {
      toast({
        title: "Erro",
        description: "Os emails não coincidem",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: data.email,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Um email de confirmação foi enviado para o novo endereço. Verifique sua caixa de entrada.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar email",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Atualizar Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleUpdateEmail)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Novo Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email", { required: "Email é obrigatório" })}
              placeholder="novo@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmEmail">Confirmar Novo Email</Label>
            <Input
              id="confirmEmail"
              type="email"
              {...form.register("confirmEmail", { required: "Confirmação é obrigatória" })}
              placeholder="novo@email.com"
            />
            {form.formState.errors.confirmEmail && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.confirmEmail.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUpdating}
          >
            {isUpdating ? "Atualizando..." : "Atualizar Email"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
