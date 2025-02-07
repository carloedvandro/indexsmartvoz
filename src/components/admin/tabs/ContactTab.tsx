
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ContactTab({ register }) {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input {...register("phone")} placeholder="Digite o telefone" />
        </div>
        <div className="space-y-2">
          <Label>Celular</Label>
          <Input {...register("mobile")} placeholder="Digite o celular" />
        </div>
        <div className="space-y-2">
          <Label>Email Alternativo</Label>
          <Input {...register("alternative_email")} type="email" placeholder="Digite o email alternativo" />
        </div>
      </div>
    </div>
  );
}
