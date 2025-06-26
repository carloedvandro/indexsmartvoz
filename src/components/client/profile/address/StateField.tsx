
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";

interface StateFieldProps {
  form: UseFormReturn<any>;
}

export function StateField({ form }: StateFieldProps) {
  const [stateValue, setStateValue] = useState(form.getValues("state") || "");

  useEffect(() => {
    setStateValue(form.getValues("state") || "");
  }, [form.getValues("state")]);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStateValue(value);
    form.setValue("state", value);
    
    if (value.length > 0) {
      form.clearErrors("state");
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        Estado <span className="text-red-500">*</span>
      </label>
      <input
        value={stateValue}
        onChange={handleStateChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        placeholder="Digite o estado"
      />
      {form.formState.errors.state && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.state.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
