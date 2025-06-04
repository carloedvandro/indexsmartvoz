
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { FullNameField } from "./components/FullNameField";
import { PersonTypeSelect } from "./components/PersonTypeSelect";
import { EmailField } from "./components/EmailField";
import { DateField } from "./components/DateField";
import { DocumentField } from "./components/DocumentField";

interface PersonalDataSectionProps {
  form: UseFormReturn<any>;
}

export function PersonalDataSection({ form }: PersonalDataSectionProps) {
  const personType = form.watch("person_type");

  // Função para lidar com mudanças no tipo de pessoa
  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPersonType = e.target.value;
    form.setValue("person_type", newPersonType);
    
    // Limpar todos os campos relacionados quando mudar o tipo de pessoa
    form.setValue("cnpj", "");
    form.setValue("full_name", "");
    form.setValue("birth_date", "");
    form.setValue("address", "");
    form.setValue("address_number", "");
    form.setValue("neighborhood", "");
    form.setValue("city", "");
    form.setValue("state", "");
    form.setValue("zip_code", "");
    form.clearErrors("cnpj");
    
    console.log("Tipo de pessoa alterado para:", newPersonType, "- Campos limpos");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <User className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-medium text-gray-700">Dados Pessoais</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FullNameField form={form} personType={personType} />
        
        <PersonTypeSelect form={form} onPersonTypeChange={handlePersonTypeChange} />

        <EmailField form={form} />
        
        <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:col-span-2">
          <DateField form={form} personType={personType} />
          <DocumentField form={form} personType={personType} />
        </div>
      </div>
    </div>
  );
}
