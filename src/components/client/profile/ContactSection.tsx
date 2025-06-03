
import { Phone } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { phoneMask, removeMask } from "@/utils/masks";

interface ContactSectionProps {
  form: UseFormReturn<any>;
}

export function ContactSection({ form }: ContactSectionProps) {
  const [whatsapp1Value, setWhatsapp1Value] = useState(form.getValues("mobile") || "");
  const [whatsapp2Value, setWhatsapp2Value] = useState(form.getValues("whatsapp") || "");

  const handleWhatsapp1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = phoneMask(value);
    const cleanValue = removeMask(value);
    
    setWhatsapp1Value(maskedValue);
    form.setValue("mobile", cleanValue);
    
    // Validar se tem pelo menos 10 dígitos
    if (cleanValue.length >= 10 && cleanValue.length <= 11) {
      form.clearErrors("mobile");
    } else if (cleanValue.length > 0) {
      form.setError("mobile", { message: "Número do WhatsApp inválido" });
    }
  };

  const handleWhatsapp2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = phoneMask(value);
    const cleanValue = removeMask(value);
    
    setWhatsapp2Value(maskedValue);
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
      
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            value={whatsapp1Value}
            onChange={handleWhatsapp1Change}
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

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            value={whatsapp2Value}
            onChange={handleWhatsapp2Change}
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
