
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
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

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
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
            className="relative z-10 w-32 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white transition-colors duration-200"
            onClick={handleBack}
          >
            Voltar
          </Button>
          
          <Button 
            type="submit"
            className="relative z-10 w-32 bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors duration-200"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
};
