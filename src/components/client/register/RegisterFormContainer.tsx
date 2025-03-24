
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
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
      sponsorCustomId: "",
      customId: "",
      birthDate: "",
      whatsapp: "",
      secondaryWhatsapp: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log("Form data:", data);
      
      // Register user with the form data
      await registerUser(data);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Vamos continuar com a verificação biométrica.",
      });
      
      // Navigate to facial biometry page
      navigate("/client/facial-biometry");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Set specific error to display in the UI
      setError(error.message || "Ocorreu um erro ao criar sua conta.");
      
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
        <FormFields form={form} />
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
