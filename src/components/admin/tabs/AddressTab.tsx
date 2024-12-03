import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function AddressTab({ register }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Endereço</Label>
        <Input {...register("address")} />
      </div>
      <div className="space-y-2">
        <Label>CEP</Label>
        <Input {...register("zip_code")} />
      </div>
      <div className="space-y-2">
        <Label>Cidade</Label>
        <Input {...register("city")} />
      </div>
      <div className="space-y-2">
        <Label>Estado</Label>
        <Input {...register("state")} />
      </div>
      <div className="space-y-2">
        <Label>País</Label>
        <Input {...register("country")} />
      </div>
    </div>
  );
}