
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
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
          <div className="relative w-32">
            <div className="absolute inset-0">
              <ParticlesBackground />
            </div>
            <Button
              type="button"
              variant="outline"
              className="relative z-10 w-full border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={handleBack}
            >
              Voltar
            </Button>
          </div>
          
          <div className="relative w-32">
            <div className="absolute inset-0">
              <ParticlesBackground />
            </div>
            <Button 
              type="submit"
              className="relative z-10 w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
