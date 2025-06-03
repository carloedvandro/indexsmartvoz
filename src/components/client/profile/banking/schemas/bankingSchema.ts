
import { z } from "zod";

export const bankingSchema = z.object({
  bank_name: z.string().min(1, "Nome do banco é obrigatório"),
  account_type: z.string().min(1, "Tipo de conta é obrigatório"),
  agency_number: z.string().min(1, "Número da agência é obrigatório"),
  agency_digit: z.string().optional(),
  account_number: z.string().min(1, "Número da conta é obrigatório"),
  account_digit: z.string().min(1, "Dígito é obrigatório"),
  account_name: z.string().min(1, "Titular da conta é obrigatório"),
  cpf_cnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  security_password: z.string().optional(),
});

export type BankingFormData = z.infer<typeof bankingSchema>;
