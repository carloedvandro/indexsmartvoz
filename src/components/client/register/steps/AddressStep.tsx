
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useState } from "react";
import { fetchCepData } from "@/services/cepService";

interface AddressStepProps {
  form: UseFormReturn<RegisterFormData>;
}

export const AddressStep = ({ form }: AddressStepProps) => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      try {
        const cepData = await fetchCepData(cleanCep);
        if (cepData) {
          form.setValue("street", cepData.logradouro || "");
          form.setValue("neighborhood", cepData.bairro || "");
          form.setValue("city", cepData.localidade || "");
          form.setValue("state", cepData.uf || "");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Informações de Endereço</h2>
        <p className="text-gray-600 text-sm mt-1">Informe seu endereço completo</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">CEP</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="text-sm h-10 rounded-md" 
                  placeholder="00000-000"
                  onBlur={(e) => handleCepBlur(e.target.value)}
                  disabled={isLoadingCep}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Número</FormLabel>
              <FormControl>
                <Input {...field} className="text-sm h-10 rounded-md" placeholder="123" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Rua/Logradouro</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="text-sm h-10 rounded-md" 
                placeholder="Nome da rua"
                disabled={isLoadingCep}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Bairro</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="text-sm h-10 rounded-md" 
                placeholder="Nome do bairro"
                disabled={isLoadingCep}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Cidade</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="text-sm h-10 rounded-md" 
                  placeholder="Nome da cidade"
                  disabled={isLoadingCep}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Estado</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="text-sm h-10 rounded-md" 
                  placeholder="UF"
                  disabled={isLoadingCep}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="complement"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Complemento (Opcional)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="text-sm h-10 rounded-md" 
                placeholder="Apartamento, bloco, etc."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
