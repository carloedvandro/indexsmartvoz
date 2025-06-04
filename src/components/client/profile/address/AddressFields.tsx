
import { UseFormReturn } from "react-hook-form";
import { capitalizeWords } from "@/utils/textFormat";

interface AddressFieldsProps {
  form: UseFormReturn<any>;
}

export function AddressFields({ form }: AddressFieldsProps) {
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("address", value);
  };

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("neighborhood", value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("complement", value);
  };

  return (
    <>
      <div className="w-full">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Endereço <span className="text-red-500">*</span>
        </label>
        <input
          value={form.watch("address") || ""}
          onChange={handleAddressChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="Rua, Avenida, etc."
        />
        {form.formState.errors.address && (
          <p className="text-red-500 text-xs mt-1">
            {String(form.formState.errors.address.message || "Campo obrigatório")}
          </p>
        )}
      </div>
      
      <div className="w-full">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Número <span className="text-red-500">*</span>
        </label>
        <input
          {...form.register("address_number")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="123"
        />
        {form.formState.errors.address_number && (
          <p className="text-red-500 text-xs mt-1">
            {String(form.formState.errors.address_number.message || "Campo obrigatório")}
          </p>
        )}
      </div>
      
      <div className="w-full">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Bairro <span className="text-red-500">*</span>
        </label>
        <input
          value={form.watch("neighborhood") || ""}
          onChange={handleNeighborhoodChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="Nome do bairro"
        />
        {form.formState.errors.neighborhood && (
          <p className="text-red-500 text-xs mt-1">
            {String(form.formState.errors.neighborhood.message || "Campo obrigatório")}
          </p>
        )}
      </div>
      
      <div className="w-full">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Complemento
        </label>
        <input
          value={form.watch("complement") || ""}
          onChange={handleComplementChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="Apto, Bloco, etc."
        />
      </div>
    </>
  );
}
