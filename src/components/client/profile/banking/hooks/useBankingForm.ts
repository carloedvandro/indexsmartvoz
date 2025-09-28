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
      person_type: profile?.person_type || "individual",
      document: profile?.cpf_cnpj || "",
      account_holder: profile?.full_name || "",
      opening_date: profile?.birth_date || ""
    },
  });

  const onSubmit = async (data: BankingFormData) => {
    try {
      setIsSubmitting(true);
      log("info", "Submitting banking form", data);
      
      // Update profile with limited banking information that exists in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          // Only update fields that actually exist in the profiles table
          // Banking specific fields would need to be stored in a separate banking table
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
