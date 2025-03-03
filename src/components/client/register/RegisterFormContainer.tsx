
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SplashCursor } from "@/components/ui/splash-cursor";

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
    <>
      <SplashCursor 
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={2.5}
        PRESSURE={0.15}
        SPLAT_RADIUS={0.25}
        COLOR_UPDATE_SPEED={8}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormFields form={form} />
          <div className="flex justify-between mt-6 gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-28 h-10 border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={handleBack}
            >
              Voltar
            </Button>
            
            <Button 
              type="submit"
              className="w-28 h-10 bg-[#8425af] hover:bg-[#6c1e8f] text-white"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
