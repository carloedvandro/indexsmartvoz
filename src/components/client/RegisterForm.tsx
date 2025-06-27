
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { registerFormSchema } from "./register/RegisterSchema";
import type { RegisterFormData } from "./register/RegisterSchema";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get("sponsor");
  const { toast } = useToast();
  const [isPostSubmitDisabled, setIsPostSubmitDisabled] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      cpf: "",
      sponsorCustomId: sponsorId || "",
      customId: "",
      birthDate: "",
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
        passwordConfirmation: "[PROTECTED]",
        sponsorCustomId: data.sponsorCustomId || "none",
      });

      await onSubmit(data);
      
      console.log("Registration completed successfully");
      toast({
        title: "Sucesso!",
        description: "Agora vamos fazer sua verificação biométrica.",
      });

      // Disable button for 5 seconds after successful submission
      setIsPostSubmitDisabled(true);
      setTimeout(() => {
        setIsPostSubmitDisabled(false);
      }, 5000);

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
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Este componente foi substituído pelo formulário em etapas. 
            Use o StepFormContainer em vez disso.
          </p>
        </div>
        <RainbowButton 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting || isPostSubmitDisabled}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Continuar"
          )}
        </RainbowButton>
      </form>
    </Form>
  );
}
