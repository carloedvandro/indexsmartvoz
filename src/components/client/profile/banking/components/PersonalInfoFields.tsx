
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, UseFormSetValue } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";
import { useDocumentHandler } from "@/hooks/useDocumentHandler";
import { DocumentInput } from "./DocumentInput";

interface PersonalInfoFieldsProps {
  control: Control<BankingFormData>;
  setValue: UseFormSetValue<BankingFormData>;
}

export function PersonalInfoFields({ control, setValue }: PersonalInfoFieldsProps) {
  const personType = control._formValues.person_type || "";
  
  const { documentValue, isLoading, handleDocumentChange } = useDocumentHandler(
    personType,
    setValue
  );

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="person_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de pessoa</FormLabel>
            <Select onValueChange={(value) => {
              field.onChange(value);
            }} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de pessoa" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
                <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <DocumentInput
        personType={personType}
        documentValue={documentValue}
        onChange={handleDocumentChange}
        isLoading={isLoading}
      />

      <FormField
        control={control}
        name="account_holder"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {personType === "Pessoa Jurídica" ? "Razão social" : "Nome completo"}
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="opening_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{personType === "Pessoa Física" ? "Data de nascimento" : "Data de abertura"}</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
