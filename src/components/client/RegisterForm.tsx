import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const sponsorId = searchParams.get("sponsor");
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsapp: "",
      password: "",
      cpf: "",
      sponsorCustomId: sponsorId || "",
      customId: "",
    },
  });

  useEffect(() => {
    if (sponsorId) {
      console.log("Setting sponsor ID from URL:", sponsorId);
      form.setValue("sponsorCustomId", sponsorId);
    }
  }, [sponsorId, form]);

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Starting form submission with data:", {
        ...data,
        password: "[PROTECTED]",
        sponsorCustomId: data.sponsorCustomId || "none",
      });

      await onSubmit(data);
      
      console.log("Registration completed successfully");
      toast({
        title: "Sucesso!",
        description: "Sua conta foi criada. Agora vamos fazer a validação biométrica.",
      });

      // Redirect to biometric validation after successful registration
      navigate("/client/biometric-validation");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
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