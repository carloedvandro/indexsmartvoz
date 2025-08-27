
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FloatingLabelInput } from "../fields/FloatingLabelInput";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { User, CreditCard } from "lucide-react";

interface AccountInfoStepProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const AccountInfoStep = ({ form, disableSponsor }: AccountInfoStepProps) => {

  const sponsorValue = form.watch("sponsor_Id");
  const customIdValue = form.watch("referred_code");
  
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Configuração da Conta</h2>
        <p className="text-gray-600 text-sm mt-1">Configure suas credenciais e identificação</p>
      </div>

      <FormField
        control={form.control}
        name="sponsor_Id"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="sponsor_Id"
                type="text"
                value={field.value || ""}
                onChange={field.onChange}
                label="ID do Patrocinador "
                icon={User}
                disabled={disableSponsor}
                placeholder=""
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="referred_code"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="referred_code"
                type="text"
                value={field.value}
                onChange={field.onChange}
                label="Seu ID Personalizado*"
                icon={CreditCard}
                placeholder=""
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
