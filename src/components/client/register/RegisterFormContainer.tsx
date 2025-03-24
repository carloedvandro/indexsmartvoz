
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get("sponsor");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { registerUser } = useRegisterUser();
  
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
      whatsapp: "",
      secondaryWhatsapp: "",
    },
  });

  useEffect(() => {
    if (sponsorId) {
      console.log("Setting sponsor ID from URL:", sponsorId);
      form.setValue("sponsorCustomId", sponsorId);
    }
  }, [sponsorId, form]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log("Form data:", {
        ...data,
        password: "[PROTECTED]",
        passwordConfirmation: "[PROTECTED]"
      });
      
      // Register user with the form data
      await registerUser(data);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para o dashboard.",
      });
      
      // Navigate directly to dashboard instead of facial biometry
      navigate("/client/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Mensagem específica para email já existente
      if (error.message.includes("já está cadastrado") || 
          error.message.includes("already registered") ||
          error.message.includes("já existe")) {
        setError("Este email já está cadastrado. Por favor, faça login ou use recuperação de senha.");
      } else {
        // Set specific error to display in the UI
        setError(error.message || "Ocorreu um erro ao criar sua conta.");
      }
      
      // Show a toast with the error message
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/client/login");
  };

  return (
    <Form {...form}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro no cadastro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormFields form={form} disableSponsor={!!sponsorId} />
        <div className="flex justify-between mt-6 gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Voltar
          </Button>
          
          <Button 
            type="submit"
            className="w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
