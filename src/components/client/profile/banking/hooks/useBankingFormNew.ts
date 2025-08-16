
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { bankingSchema, BankingFormData } from "../schemas/bankingSchema";
import { ProfileWithSponsor } from "@/types/profile";
import { useProfileBankAccounts, CreateProfileBankAccount, UpdateProfileBankAccount } from "@/hooks/useProfileBankAccounts";
import { log, logError } from "@/utils/logging/userLogger";

export function useBankingFormNew(profile: ProfileWithSponsor) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { useCreate, useUpdate, useGetAll } = useProfileBankAccounts();
  const createBankAccount = useCreate();
  const updateBankAccount = useUpdate();
  const { data: existingAccounts } = useGetAll(profile.id);

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
        type_key_pix: data.person_type === "Pessoa Física" ? "CPF" : "CNPJ",
        key_pix: data.document,
      };

      if (existingAccounts && existingAccounts.length > 0) {
        // Atualizar conta existente
        const updateData: UpdateProfileBankAccount = {
          type_key_pix: bankAccountData.type_key_pix,
          key_pix: bankAccountData.key_pix,
        };
        
        await updateBankAccount.mutateAsync({
          id: existingAccounts[0].id,
          data: updateData
        });
      } else {
        // Criar nova conta
        await createBankAccount.mutateAsync(bankAccountData);
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
    existingAccounts
  };
}
