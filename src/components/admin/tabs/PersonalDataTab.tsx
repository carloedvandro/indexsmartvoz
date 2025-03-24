
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateForInput } from "@/utils/format";

export function PersonalDataTab({ register, setValue, watch, readOnly = false }) {
  // Format the birth date for display if it exists
  const birthDate = watch("birth_date");

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
