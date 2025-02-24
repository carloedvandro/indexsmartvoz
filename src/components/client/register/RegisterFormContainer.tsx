
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Form } from "@/components/ui/form";
import { FormFields } from "./FormFields";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";

export const RegisterFormContainer = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields form={form} />
        <RainbowButton type="submit" className="w-full !bg-[#5f0889] hover:!bg-[#4a0668]">
          Cadastrar
        </RainbowButton>
      </form>
    </Form>
  );
};
