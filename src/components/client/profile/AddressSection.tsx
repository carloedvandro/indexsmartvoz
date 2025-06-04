
import { UseFormReturn } from "react-hook-form";
import { CepField } from "./address/CepField";
import { StateField } from "./address/StateField";
import { CityField } from "./address/CityField";
import { AddressFields } from "./address/AddressFields";

interface AddressSectionProps {
  form: UseFormReturn<any>;
}

export function AddressSection({ form }: AddressSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CepField form={form} />
        <div></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StateField form={form} />
        <CityField form={form} />
      </div>
      
      <AddressFields form={form} />
    </div>
  );
}
