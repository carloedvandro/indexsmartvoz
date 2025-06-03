
import { UseFormReturn } from "react-hook-form";

interface ContactSectionProps {
  form: UseFormReturn<any>;
}

export function ContactSection({ form }: ContactSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <span className="text-lg">📞</span>
        <h3 className="text-lg font-medium text-gray-700">Contato</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Celular <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("mobile")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="(15) 33598-485"
          />
          {form.formState.errors.mobile && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.mobile.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="comercial@widigital.com.br"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.email.message || "Campo obrigatório")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
