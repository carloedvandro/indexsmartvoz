import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "./register/RegisterSchema";
import type { RegisterFormData } from "./register/RegisterSchema";
import { FormFields } from "./register/FormFields";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get("sponsor");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      cpf: "",
      sponsorCustomId: sponsorId || "",
      customId: "",
    },
  });

  // Disable sponsor field if it comes from URL
  useEffect(() => {
    if (sponsorId) {
      form.setValue("sponsorCustomId", sponsorId);
    }
  }, [sponsorId, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFields form={form} disableSponsor={!!sponsorId} />
        <Button type="submit" className="w-full">
          Criar Conta
        </Button>
      </form>
    </Form>
  );
}