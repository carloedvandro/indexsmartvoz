import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { registerFormSchema, RegisterFormData } from "./register/RegisterSchema";
import { FormFields } from "./register/FormFields";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      cpf: "",
      sponsorCustomId: "",
      customId: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFields form={form} />
        <Button type="submit" className="w-full">
          Criar Conta
        </Button>
      </form>
    </Form>
  );
}

// Export the RegisterFormData type
export type { RegisterFormData };