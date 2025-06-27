
import { z } from "zod";
import { validatePasswordStrength } from "@/utils/passwordValidation";
import { validateCPF } from "@/utils/validation/cpfValidation";

export const registerFormSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().refine(
    (password) => validatePasswordStrength(password).isValid,
    (password) => ({ message: validatePasswordStrength(password).message })
  ),
  passwordConfirmation: z.string().min(1, "Confirmação de senha é obrigatória"),
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  sponsorCustomId: z.string().optional(),
  customId: z.string()
    .min(3, "ID personalizado deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "ID personalizado deve conter apenas letras e números"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  whatsapp: z.string().min(10, "WhatsApp deve ter pelo menos 10 dígitos"),
  secondaryWhatsapp: z.string().optional(),
  cep: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  complement: z.string().optional(),
}).refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  }
).refine(
  (data) => {
    // Validação do segundo WhatsApp apenas se preenchido
    if (!data.secondaryWhatsapp || data.secondaryWhatsapp.trim() === "") {
      return true; // Se vazio, não há problema
    }
    return data.whatsapp !== data.secondaryWhatsapp;
  },
  {
    message: "O segundo contato deve ser diferente do WhatsApp principal",
    path: ["secondaryWhatsapp"],
  }
);

export type RegisterFormData = z.infer<typeof registerFormSchema>;
