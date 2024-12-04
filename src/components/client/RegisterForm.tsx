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

  // Disable sponsor field if it comes from URL
  useEffect(() => {
    if (sponsorId) {
      form.setValue("sponsorCustomId", sponsorId);
    }
  }, [sponsorId, form]);

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Form submitted with data:", { ...data, password: "[PROTECTED]" });
      await onSubmit(data);
      toast({
        title: "Formulário enviado",
        description: "Seus dados foram enviados com sucesso!",
      });
    } catch (error: any) {
      console.error("Error in form submission:", error);
      toast({
        title: "Erro no envio",
        description: error.message || "Ocorreu um erro ao enviar o formulário",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormFields form={form} disableSponsor={!!sponsorId} />
        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Criando conta..." : "Criar Conta"}
        </Button>
      </form>
    </Form>
  );
}