
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "@/services/user/userCreate";
import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Chave para armazenar os dados do formulário no localStorage
const FORM_STORAGE_KEY = "smartvoz_register_form_data";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Carrega os valores iniciais do formulário do localStorage
  const getSavedFormValues = () => {
    try {
      const savedValues = localStorage.getItem(FORM_STORAGE_KEY);
      return savedValues ? JSON.parse(savedValues) : {
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
      };
    } catch (error) {
      console.error("Erro ao carregar dados salvos:", error);
      return {
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
      };
    }
  };
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: getSavedFormValues(),
  });

  // Salva os dados do formulário no localStorage sempre que houver mudanças
  useEffect(() => {
    const subscription = form.watch((values) => {
      // Não salva senhas no localStorage por segurança, mas mantém os outros campos
      const dataToSave = {
        ...values,
        password: values.password ? values.password : "",
        passwordConfirmation: values.passwordConfirmation ? values.passwordConfirmation : "",
      };
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log("Form data:", data);
      
      // Create user with the form data
      await createUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        cpf: data.cpf,
        customId: data.customId,
        sponsorCustomId: data.sponsorCustomId,
      });
      
      // Limpa os dados salvos após o cadastro bem-sucedido
      localStorage.removeItem(FORM_STORAGE_KEY);
      
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

  // Confirmação antes de navegar para trás se o formulário tiver alterações
  const handleBack = () => {
    // Confirma antes de navegar se o formulário foi modificado
    if (form.formState.isDirty && !window.confirm("Você tem certeza que deseja voltar? Suas alterações serão salvas localmente, mas você precisará preencher o formulário novamente.")) {
      return;
    }
    navigate(-1);
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
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
