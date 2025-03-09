
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "@/services/user/userCreate";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Vamos continuar com a verificação biométrica.",
      });
      
      // Navigate to facial biometry page
      navigate("/client/facial-biometry");
    } catch (error: any) {
      console.error("Registration error:", error);
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
    navigate(-1);
  };

  return (
    <Form {...form}>
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
