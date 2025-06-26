
import { Phone } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { phoneMask, removeMask } from "@/utils/masks";

interface ContactSectionProps {
  form: UseFormReturn<any>;
}

export function ContactSection({ form }: ContactSectionProps) {
  const [whatsappValue, setWhatsappValue] = useState(form.getValues("whatsapp") || "");
  const [secondaryWhatsappValue, setSecondaryWhatsappValue] = useState(form.getValues("secondary_whatsapp") || "");

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = phoneMask(value);
    const cleanValue = removeMask(value);
    
    setWhatsappValue(maskedValue);
    form.setValue("whatsapp", cleanValue);
    
    if (cleanValue.length >= 10 && cleanValue.length <= 11) {
      form.clearErrors("whatsapp");
    } else if (cleanValue.length > 0) {
      form.setError("whatsapp", { message: "Número do WhatsApp inválido" });
    }
  };

  const handleSecondaryWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = phoneMask(value);
    const cleanValue = removeMask(value);
    
    setSecondaryWhatsappValue(maskedValue);
    form.setValue("secondary_whatsapp", cleanValue);
    
    if (cleanValue.length > 0 && (cleanValue.length < 10 || cleanValue.length > 11)) {
      form.setError("secondary_whatsapp", { message: "Número do WhatsApp inválido" });
    } else {
      form.clearErrors("secondary_whatsapp");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <Phone className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-medium text-gray-700">Contato</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            WhatsApp Principal <span className="text-red-500">*</span>
          </label>
          <input
            value={whatsappValue}
            onChange={handleWhatsappChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          {form.formState.errors.whatsapp && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.whatsapp.message || "Campo obrigatório")}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            WhatsApp Secundário
          </label>
          <input
            value={secondaryWhatsappValue}
            onChange={handleSecondaryWhatsappChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          {form.formState.errors.secondary_whatsapp && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.secondary_whatsapp.message)}
            </p>
          )}
        </div>
      </div>
      
      <div className="w-full">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...form.register("email")}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="seu@email.com"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {String(form.formState.errors.email.message || "Campo obrigatório")}
          </p>
        )}
      </div>
    </div>
  );
}
