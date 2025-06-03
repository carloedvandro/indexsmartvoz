
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { ProfileWithSponsor } from "@/types/profile";
import { updateProfile } from "@/services/user/userUpdate";
import { bankingSchema, BankingFormData } from "../schemas/bankingSchema";

export function useBankingForm(profile: ProfileWithSponsor) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BankingFormData>({
    resolver: zodResolver(bankingSchema),
    defaultValues: {
      bank_name: profile.bank_name || "",
      account_type: profile.account_type || "Conta Corrente",
      agency_number: profile.agency_number || "",
      agency_digit: profile.agency_digit || "",
      account_number: profile.account_number || "",
      account_digit: profile.account_digit || "",
      account_name: profile.account_name || profile.full_name || "",
      cpf_cnpj: profile.cpf_cnpj || profile.cpf || "",
      security_password: profile.security_password || "",
    },
  });

  const onSubmit = async (data: BankingFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile(profile.id, {
        bank_name: data.bank_name,
        account_number: data.account_number,
        account_name: data.account_name,
        agency_number: data.agency_number,
        agency_digit: data.agency_digit,
        account_digit: data.account_digit,
        account_type: data.account_type,
        cpf_cnpj: data.cpf_cnpj,
        security_password: data.security_password,
      });

      toast({
        title: "Sucesso",
        description: "Dados bancários atualizados com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar dados bancários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os dados bancários.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
