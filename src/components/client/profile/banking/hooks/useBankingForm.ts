import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { bankingSchema, BankingFormData } from "../schemas/bankingSchema";
import { ProfileWithSponsor } from "@/types/profile";
import { supabase } from "@/integrations/supabase/client";
import { log, logError } from "@/utils/logging/userLogger";

export function useBankingForm(profile: ProfileWithSponsor) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BankingFormData>({
    resolver: zodResolver(bankingSchema),
    defaultValues: {
      bank_name: profile?.bank_name || "",
      account_type: "",
      agency: "",
      agency_digit: "",
      account_number: profile?.account_number || "",
      account_digit: "",
      person_type: profile?.person_type || "",
      document: profile?.cnpj || "",
      account_holder: profile?.full_name || "",
      opening_date: profile?.birth_date || ""
    },
  });

  const onSubmit = async (data: BankingFormData) => {
    try {
      setIsSubmitting(true);
      log("info", "Submitting banking form", data);
      
      // Update the profile with banking information
      const { error } = await supabase
        .from('profiles')
        .update({
          bank_name: data.bank_name,
          account_number: `${data.account_number}-${data.account_digit}`,
          // Other banking fields could be stored in a JSON column or separate table
          // For now, we'll just use the basic fields that exist in the profile table
        })
        .eq('id', profile.id);
      
      if (error) {
        throw new Error(error.message);
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
    onSubmit
  };
}
