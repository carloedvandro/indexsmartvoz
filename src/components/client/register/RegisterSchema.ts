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
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  sponsorCustomId: z.string().min(1, "ID do patrocinador é obrigatório"),
  customId: z.string()
    .min(3, "ID personalizado deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "ID personalizado deve conter apenas letras e números"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;