
import { z } from "zod";

export const bankingSchema = z.object({
  bank_name: z.string().min(1, "Nome do banco é obrigatório"),
  account_type: z.string().min(1, "Tipo de conta é obrigatório"),
  agency: z.string().min(1, "Agência é obrigatória"),
  agency_digit: z.string().optional(),
  account_number: z.string().min(1, "Número da conta é obrigatório"),
  account_digit: z.string().min(1, "Dígito da conta é obrigatório"),
  person_type: z.string().min(1, "Tipo de pessoa é obrigatório"),
  document: z.string().optional(),
  account_holder: z.string().min(1, "Nome do titular é obrigatório"),
  opening_date: z.string().min(1, "Data é obrigatória")
});

export type BankingFormData = z.infer<typeof bankingSchema>;
