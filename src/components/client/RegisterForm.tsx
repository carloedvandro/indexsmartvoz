import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "./register/RegisterSchema";
import type { RegisterFormData } from "./register/RegisterSchema";
import { FormFields } from "./register/FormFields";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get("sponsor");
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      cpf: "",
      sponsorCustomId: sponsorId || "",
      customId: "",
    },
  });

  useEffect(() => {
    if (sponsorId) {
      form.setValue("sponsorCustomId", sponsorId);
    }
  }, [sponsorId, form]);

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Iniciando submissão do formulário com dados:", {
        ...data,
        password: "[PROTEGIDO]",
      });

      await onSubmit(data);
      
      console.log("Registro concluído com sucesso");
      toast({
        title: "Sucesso!",
        description: "Sua conta foi criada com sucesso. Você será redirecionado em instantes.",
      });
    } catch (error: any) {
      console.error("Erro durante o registro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error; // Re-throw to be handled by the form's error state
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleFormSubmit)} 
        className="space-y-4"
      >
        <FormFields form={form} disableSponsor={!!sponsorId} />
        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </form>
    </Form>
  );
}