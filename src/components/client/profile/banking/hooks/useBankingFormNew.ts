
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { bankingSchema, BankingFormData } from "../schemas/bankingSchema";
import { ProfileWithSponsor } from "@/types/profile";
import { useProfileBankAccounts, CreateProfileBankAccount } from "@/hooks/useProfileBankAccounts";
import { log, logError } from "@/utils/logging/userLogger";

export function useBankingFormNew(profile: ProfileWithSponsor) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { bankAccounts, createBankAccount, updateBankAccount } = useProfileBankAccounts();

  const form = useForm<BankingFormData>({
    resolver: zodResolver(bankingSchema),
    defaultValues: {
      bank_name: "",
      account_type: "",
      agency: "",
      agency_digit: "",
      account_number: "",
      account_digit: "",
      person_type: profile?.person_type || "",
      document: profile?.cpf_cnpj || "",
      account_holder: profile?.full_name || "",
      opening_date: profile?.birth_date || ""
    },
  });

  const onSubmit = async (data: BankingFormData) => {
    try {
      setIsSubmitting(true);
      log("info", "Submitting banking form", data);
      
      const bankAccountData: CreateProfileBankAccount = {
        profile_id: profile.id,
        bank_name: data.bank_name,
        account_type: data.account_type,
        agency: data.agency,
        account_number: data.account_number,
        account_holder_name: data.account_holder,
        account_holder_cpf: data.document,
        pix_key: data.document,
        pix_key_type: data.person_type === "Pessoa Física" ? "CPF" : "CNPJ",
      };

      if (bankAccounts && bankAccounts.length > 0) {
        // Atualizar conta existente
        updateBankAccount({
          id: bankAccounts[0].id,
          updates: bankAccountData
        });
      } else {
        // Criar nova conta
        createBankAccount(bankAccountData);
      }
      
      // Invalidate queries to refresh data
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      
      toast({
        title: "Sucesso",
        description: "Dados bancários atualizados com sucesso",
      });
      
      log("info", "Banking form submitted successfully", data);
    } catch (error: any) {
      logError("Error submitting banking form", error);
      
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar os dados bancários",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    existingAccounts: bankAccounts
  };
}
