
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateForInput, formatDateBR } from "@/utils/format";
import { useEffect } from "react";

export function PersonalDataTab({ register, setValue, watch, readOnly = false }) {
  // Format the birth date for display if it exists
  const birthDate = watch("birth_date");
  
  // Format birth date on input change to match Brazilian format
  useEffect(() => {
    if (birthDate && /^\d{4}-\d{2}-\d{2}/.test(birthDate)) {
      // Convert YYYY-MM-DD to DD/MM/YYYY for display
      const [year, month, day] = birthDate.split('-');
      // Don't update if already in correct format
      if (day && month && year) {
        console.log("Formatted birth date for display:", `${day}/${month}/${year}`);
      }
    }
  }, [birthDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Nome Completo</Label>
        <Input {...register("full_name")} />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register("email")} type="email" readOnly={readOnly} />
      </div>
      <div className="space-y-2">
        <Label>Data de Nascimento</Label>
        <Input 
          {...register("birth_date")} 
          type="date" 
          placeholder="DD/MM/AAAA"
        />
      </div>
      <div className="space-y-2">
        <Label>Tipo de Pessoa</Label>
        <Select
          onValueChange={(value) => setValue("person_type", value)}
          defaultValue={watch("person_type")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pf">Pessoa Física</SelectItem>
            <SelectItem value="pj">Pessoa Jurídica</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>CPF</Label>
        <Input {...register("document_id")} />
      </div>
      <div className="space-y-2">
        <Label>CNPJ</Label>
        <Input {...register("cnpj")} />
      </div>
    </div>
  );
}
