
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { createUser } from "@/services/user/userCreate";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Iniciando registro com dados:", {
        ...data,
        password: "[PROTEGIDO]",
        passwordConfirmation: "[PROTEGIDO]"
      });

      await createUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        cpf: data.cpf,
        customId: data.customId,
        sponsorCustomId: data.sponsorCustomId,
      });

      toast({
        title: "Sucesso!",
        description: "Cadastro realizado com sucesso.",
      });

      navigate("/client/login");
    } catch (error: any) {
      console.error("Erro no registro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields form={form} />
        <RainbowButton 
          type="submit" 
          className="w-full !bg-[#5f0889]/90 backdrop-blur-sm hover:!bg-[#4a0668]/90 shadow-lg"
        >
          Cadastrar
        </RainbowButton>
      </form>
    </Form>
  );
};
