
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { cepMask, removeMask } from "@/utils/masks";
import { handleCepLookup } from "@/utils/cepUtils";
import { useToast } from "@/hooks/use-toast";

interface CepFieldProps {
  form: UseFormReturn<any>;
}

export function CepField({ form }: CepFieldProps) {
  const [cepValue, setCepValue] = useState(form.getValues("zip_code") || "");
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const { toast } = useToast();

  // Escutar mudanças no CEP vindas do CNPJ
  useEffect(() => {
    const handleCepUpdate = () => {
      const currentCep = form.getValues("zip_code");
      if (currentCep) {
        setCepValue(cepMask(currentCep));
      }
    };

    window.addEventListener('cep-update', handleCepUpdate);
    return () => window.removeEventListener('cep-update', handleCepUpdate);
  }, [form]);

  // Também escutar mudanças diretas no formulário
  useEffect(() => {
    const currentCep = form.watch("zip_code");
    if (currentCep && currentCep !== removeMask(cepValue)) {
      setCepValue(cepMask(currentCep));
    }
  }, [form.watch("zip_code")]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = cepMask(value);
    const cleanValue = removeMask(value);
    
    setCepValue(maskedValue);
    form.setValue("zip_code", cleanValue);
    
    // Se CEP estiver completo, buscar endereço
    if (cleanValue.length === 8) {
      setIsLoadingCep(true);
      const success = await handleCepLookup(
        cleanValue,
        form,
        () => {
          toast({
            title: "CEP encontrado",
            description: "Endereço preenchido automaticamente",
          });
        },
        () => {
          toast({
            title: "CEP não encontrado",
            description: "Verifique o CEP digitado",
            variant: "destructive",
          });
        }
      );
      setIsLoadingCep(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        CEP <span className="text-red-500">*</span>
      </label>
      <input
        value={cepValue}
        onChange={handleCepChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        placeholder="00000-000"
        maxLength={9}
        disabled={isLoadingCep}
      />
      {isLoadingCep && (
        <p className="text-blue-500 text-xs mt-1">Buscando endereço...</p>
      )}
      {form.formState.errors.zip_code && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.zip_code.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
