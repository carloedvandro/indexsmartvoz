import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ContactTab({ register }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Telefone</Label>
        <Input {...register("phone")} />
      </div>
      <div className="space-y-2">
        <Label>Celular</Label>
        <Input {...register("mobile")} />
      </div>
    </div>
  );
}