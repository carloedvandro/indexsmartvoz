import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!user.id) {
        // Check if user exists first
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', data.email)
          .single();

        if (existingUser) {
          toast({
            title: "Erro",
            description: "Este email já está cadastrado no sistema",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Create new user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: "changeme123", // Temporary password
          options: {
            data: {
              full_name: data.full_name,
            },
          },
        });

        if (authError) {
          if (authError.message.includes("already registered")) {
            toast({
              title: "Erro",
              description: "Este email já está cadastrado no sistema",
              variant: "destructive",
            });
            return;
          }
          throw authError;
        }

        // Update the profile with additional data
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            ...data,
            id: authData.user.id,
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso",
        });
      } else {
        // Update existing user
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso",
        });
      }
      
      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar usuário",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>{user?.id ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input {...register("email")} type="email" readOnly={!!user?.id} />
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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}