
import { Phone } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { phoneMask, removeMask } from "@/utils/masks";

interface ContactSectionProps {
  form: UseFormReturn<any>;
}

export function ContactSection({ form }: ContactSectionProps) {
  const [mobileValue, setMobileValue] = useState(form.getValues("mobile") || "");
  const [whatsappValue, setWhatsappValue] = useState(form.getValues("whatsapp") || "");

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = phoneMask(value);
    const cleanValue = removeMask(value);
    
    setMobileValue(maskedValue);
    form.setValue("mobile", cleanValue);
    
    // Validar se tem pelo menos 10 dígitos
    if (cleanValue.length >= 10 && cleanValue.length <= 11) {
      form.clearErrors("mobile");
    } else if (cleanValue.length > 0) {
      form.setError("mobile", { message: "Número de celular inválido" });
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = phoneMask(value);
    const cleanValue = removeMask(value);
    
    setWhatsappValue(maskedValue);
    form.setValue("whatsapp", cleanValue);
    
    // Validar se tem pelo menos 10 dígitos
    if (cleanValue.length >= 10 && cleanValue.length <= 11) {
      form.clearErrors("whatsapp");
    } else if (cleanValue.length > 0) {
      form.setError("whatsapp", { message: "Número do WhatsApp inválido" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <Phone className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-700">Contato</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Celular <span className="text-red-500">*</span>
          </label>
          <input
            value={mobileValue}
            onChange={handleMobileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          {form.formState.errors.mobile && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.mobile.message || "Campo obrigatório")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            value={whatsappValue}
            onChange={handleWhatsappChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          {form.formState.errors.whatsapp && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.whatsapp.message || "Campo obrigatório")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
