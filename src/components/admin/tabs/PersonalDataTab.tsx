
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PersonalDataTab({ register, setValue, watch, readOnly = false }) {
  const personType = watch("person_type");

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome Completo</Label>
          <Input 
            {...register("full_name")} 
            placeholder="Digite o nome completo" 
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input 
            {...register("email")} 
            type="email" 
            readOnly={readOnly} 
            placeholder="Digite o email"
          />
        </div>
        <div className="space-y-2">
          <Label>Data de Nascimento</Label>
          <Input 
            {...register("birth_date")} 
            type="date" 
            placeholder="dd/mm/aaaa"
          />
        </div>
        <div className="space-y-2">
          <Label>Tipo de Pessoa</Label>
          <Select
            onValueChange={(value) => setValue("person_type", value)}
            value={personType || ''}
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
          <Input 
            {...register("document_id")} 
            placeholder="Digite o CPF"
          />
        </div>
        <div className="space-y-2">
          <Label>CNPJ</Label>
          <Input 
            {...register("cnpj")} 
            placeholder="Digite o CNPJ"
          />
        </div>
      </div>
    </div>
  );
}
