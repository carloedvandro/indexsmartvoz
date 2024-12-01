import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserFormTabs({ register, setValue, watch, readOnly = false }) {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="contact">Contato</TabsTrigger>
        <TabsTrigger value="address">Endereço</TabsTrigger>
        <TabsTrigger value="other">Outros</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="space-y-4">
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
            <Input {...register("birth_date")} type="date" />
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
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
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
      </TabsContent>

      <TabsContent value="address" className="space-y-4">
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
      </TabsContent>

      <TabsContent value="other" className="space-y-4">
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
              <SelectContent>
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
      </TabsContent>
    </Tabs>
  );
}