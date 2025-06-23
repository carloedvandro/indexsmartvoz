
import { z } from "zod";
import { validatePasswordStrength } from "@/utils/passwordValidation";
import { validateCPF } from "@/utils/cpfValidation";

export const registerFormSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().refine(
    (password) => validatePasswordStrength(password).isValid,
    (password) => ({ message: validatePasswordStrength(password).message })
  ),
  passwordConfirmation: z.string().min(1, "Confirmação de senha é obrigatória"),
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  sponsorCustomId: z.string().min(1, "ID do patrocinador é obrigatório"),
  customId: z.string()
    .min(3, "ID personalizado deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "ID personalizado deve conter apenas letras e números"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  whatsapp: z.string().min(11, "WhatsApp deve ter pelo menos 11 dígitos"),
  secondaryWhatsapp: z.string().optional(),
}).refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  }
).refine(
  (data) => {
    if (!data.secondaryWhatsapp) return true;
    return data.whatsapp !== data.secondaryWhatsapp;
  },
  {
    message: "O segundo contato deve ser diferente do WhatsApp principal",
    path: ["secondaryWhatsapp"],
  }
);

export type RegisterFormData = z.infer<typeof registerFormSchema>;
