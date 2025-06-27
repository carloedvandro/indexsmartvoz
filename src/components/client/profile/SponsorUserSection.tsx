
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface SponsorUserSectionProps {
  form: UseFormReturn<any>;
}

export function SponsorUserSection({ form }: SponsorUserSectionProps) {
  return (
    <div className="space-y-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patrocinador
        </label>
        <input
          {...form.register("sponsor")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Informações do patrocinador"
          readOnly
        />
        {form.formState.errors.sponsor && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.sponsor.message}
          </p>
        )}
      </div>
      
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Usuário <span className="text-red-500">*</span>
        </label>
        <input
          {...form.register("custom_id")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Digite seu ID personalizado"
        />
        {form.formState.errors.custom_id && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.custom_id.message}
          </p>
        )}
      </div>
    </div>
  );
}
