
import { fetchCepData } from "@/services/cepService";
import { abbreviationToFullName } from "@/data/brazilianStatesAndCities";
import { UseFormReturn } from "react-hook-form";
import { capitalizeWords } from "@/utils/textFormat";

export const handleCepLookup = async (
  cep: string,
  form: UseFormReturn<any>,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    const cepData = await fetchCepData(cep);
    if (cepData) {
      // Aplicar capitalização nos dados que vêm do CEP
      form.setValue("address", capitalizeWords(cepData.logradouro || ""));
      form.setValue("neighborhood", capitalizeWords(cepData.bairro || ""));
      form.setValue("city", cepData.localidade);
      // Converter abreviação do CEP para nome completo
      const fullStateName = abbreviationToFullName[cepData.uf];
      if (fullStateName) {
        form.setValue("state", fullStateName);
      }
      onSuccess?.();
      return true;
    } else {
      onError?.();
      return false;
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    onError?.();
    return false;
  }
};
