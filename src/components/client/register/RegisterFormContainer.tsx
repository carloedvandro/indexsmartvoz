
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-none bg-white/5 backdrop-blur-sm">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormFields form={form} />
            <RainbowButton type="submit" className="w-full">
              Cadastrar
            </RainbowButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
