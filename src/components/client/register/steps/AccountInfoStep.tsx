
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
  console.log("🎨 === RENDERIZANDO AccountInfoStep ===", { disableSponsor });
  
  const sponsorValue = form.watch("sponsorCustomId");
  const customIdValue = form.watch("customId");
  
  console.log("📋 AccountInfoStep valores em tempo real:", { 
    sponsorCustomId: sponsorValue,
    customId: customIdValue,
    customIdLength: customIdValue ? customIdValue.length : 0
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Configuração da Conta</h2>
        <p className="text-gray-600 text-sm mt-1">Configure suas credenciais e identificação</p>
      </div>

      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="sponsorCustomId"
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
        name="customId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="customId"
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

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Debug Info:</strong>
        </p>
        <p className="text-xs text-blue-600">
          Custom ID: "{customIdValue}" (length: {customIdValue ? customIdValue.length : 0})
        </p>
        <p className="text-xs text-blue-600">
          Sponsor ID: "{sponsorValue}" (disabled: {disableSponsor ? 'sim' : 'não'})
        </p>
      </div>
    </div>
  );
};
