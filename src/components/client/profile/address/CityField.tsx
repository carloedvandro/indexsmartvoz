
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";

interface CityFieldProps {
  form: UseFormReturn<any>;
}

export function CityField({ form }: CityFieldProps) {
  const [cityValue, setCityValue] = useState(form.getValues("city") || "");

  useEffect(() => {
    setCityValue(form.getValues("city") || "");
  }, [form.getValues("city")]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityValue(value);
    form.setValue("city", value);
    
    if (value.length > 0) {
      form.clearErrors("city");
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        Cidade <span className="text-red-500">*</span>
      </label>
      <input
        value={cityValue}
        onChange={handleCityChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        placeholder="Digite a cidade"
      />
      {form.formState.errors.city && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.city.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
