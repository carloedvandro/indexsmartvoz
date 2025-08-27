
import { z } from "zod";
import { validatePasswordStrength } from "@/utils/passwordValidation";
import { validateCPF } from "@/utils/validation/cpfValidation";

export const registerFormSchema = z.object({
  full_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().refine(
    (password) => validatePasswordStrength(password).isValid,
    (password) => ({ message: validatePasswordStrength(password).message })
  ),
  passwordConfirmation: z.string().min(1, "Confirmação de senha é obrigatória"),
  cpf_cnpj: z.string().refine(validateCPF, "Documento inválido"),
  sponsor_Id: z.string().optional(),
  referred_code: z.string()
    .min(3, "ID personalizado deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "ID personalizado deve conter apenas letras e números"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  phone: z.string().min(10, "Telefone deve ser valido")
}).refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  }
)

export type RegisterFormData = z.infer<typeof registerFormSchema>;
