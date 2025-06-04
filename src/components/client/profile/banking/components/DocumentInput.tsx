
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel } from "@/components/ui/form";

interface DocumentInputProps {
  personType: string;
  documentValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export function DocumentInput({ personType, documentValue, onChange, isLoading }: DocumentInputProps) {
  if (!personType) return null;

  return (
    <FormItem>
      <FormLabel>{personType === "Pessoa Física" ? "CPF" : "CNPJ"}</FormLabel>
      <div className="relative">
        <Input
          value={documentValue}
          onChange={onChange}
          placeholder={personType === "Pessoa Física" ? "000.000.000-00" : "00.000.000/0000-00"}
          className={isLoading ? "pr-10" : ""}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    </FormItem>
  );
}
