
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
        <Button 
          type="submit" 
          className="w-full bg-[#8425af]/95 hover:bg-[#8425af]/95 text-white"
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};
