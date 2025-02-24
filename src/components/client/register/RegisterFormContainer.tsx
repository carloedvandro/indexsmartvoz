
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";

export const RegisterFormContainer = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      cpf: "",
      birthDate: "",
      customId: "",
      whatsapp: "",
      secondaryWhatsapp: "",
      sponsorCustomId: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormFields form={methods} />
          <RainbowButton 
            type="submit" 
            className="w-full !bg-[#5f0889] hover:!bg-[#4a0668]"
          >
            Cadastrar
          </RainbowButton>
        </form>
      </Form>
    </FormProvider>
  );
};
