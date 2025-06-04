
import { UseFormReturn } from "react-hook-form";
import { statesAndCities } from "@/data/brazilianStatesAndCities";

interface CityFieldProps {
  form: UseFormReturn<any>;
}

export function CityField({ form }: CityFieldProps) {
  const selectedState = form.watch("state");
  const cities = selectedState ? statesAndCities[selectedState as keyof typeof statesAndCities] || [] : [];

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        Cidade <span className="text-red-500">*</span>
      </label>
      <select
        {...form.register("city")}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10 text-sm"
        disabled={!selectedState}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em'
        }}
      >
        <option value="">
          {selectedState ? "Selecione a cidade" : "Primeiro selecione o estado"}
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {form.formState.errors.city && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.city.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
