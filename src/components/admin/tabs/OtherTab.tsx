
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OtherTab({ register, setValue, watch }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          onValueChange={(value) => setValue("status", value)}
          defaultValue={watch("status")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="bg-gray-50">
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="blocked">Bloqueado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Tipo de Licença</Label>
        <Input {...register("license_type")} />
      </div>
      <div className="space-y-2">
        <Label>Tipo de Graduação</Label>
        <Input {...register("graduation_type")} />
      </div>
      <div className="space-y-2">
        <Label>Voucher</Label>
        <Input {...register("voucher")} />
      </div>
    </div>
  );
}
