
import { UseFormReturn } from "react-hook-form";

interface SponsorUserSectionProps {
  form: UseFormReturn<any>;
  sponsorInfo: string;
}

export function SponsorUserSection({ form, sponsorInfo }: SponsorUserSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patrocinador
          </label>
          <input
            {...form.register("sponsor")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
            disabled
            readOnly
          />
        </div>
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usuário <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("custom_id")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {form.formState.errors.custom_id && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.custom_id.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
