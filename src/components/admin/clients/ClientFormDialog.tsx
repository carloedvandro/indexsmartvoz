import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye, EyeOff } from "lucide-react";

interface ClientFormData {
  email: string;
  full_name: string;
  cpf: string;
  phone: string;
  mobile: string;
  birth_date: string;
  person_type: string;
  document_id: string;
  cnpj?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  gender: string;
  civil_status: string;
  status: string;
  role: string;
}

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: any;
}

// Senha padrão mais forte que atende aos requisitos de segurança
const DEFAULT_PASSWORD = "ClienteTemp2024@#$";

export function ClientFormDialog({ open, onOpenChange, client }: ClientFormDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ClientFormData>({
    defaultValues: {
      email: '',
      full_name: '',
      cpf: '',
      phone: '',
      mobile: '',
      birth_date: '',
      person_type: 'individual',
      document_id: '',
      cnpj: '',
      address: '',
      city: '',
      state: '',
      country: 'Brasil',
      zip_code: '',
      gender: 'not_specified',
      civil_status: 'not_specified',
      status: 'active',
      role: 'client'
    }
  });

  // Carregar dados do cliente quando o modal for aberto para edição
  useEffect(() => {
    if (open && client?.id) {
      console.log('Loading client data for editing:', client);
      
      // Definir valores do formulário com os dados do cliente
      setValue('email', client.email || '');
      setValue('full_name', client.full_name || '');
      setValue('cpf', client.cpf || '');
      setValue('phone', client.phone || '');
      setValue('mobile', client.mobile || '');
      setValue('birth_date', client.birth_date ? client.birth_date.split('T')[0] : '');
      setValue('person_type', client.person_type || 'individual');
      setValue('document_id', client.document_id || '');
      setValue('cnpj', client.cnpj || '');
      setValue('address', client.address || '');
      setValue('city', client.city || '');
      setValue('state', client.state || '');
      setValue('country', client.country || 'Brasil');
      setValue('zip_code', client.zip_code || '');
      setValue('gender', client.gender || 'not_specified');
      setValue('civil_status', client.civil_status || 'not_specified');
      setValue('status', client.status || 'active');
      setValue('role', 'client');
    } else if (open && !client?.id) {
      // Resetar formulário para novo cliente
      reset({
        email: '',
        full_name: '',
        cpf: '',
        phone: '',
        mobile: '',
        birth_date: '',
        person_type: 'individual',
        document_id: '',
        cnpj: '',
        address: '',
        city: '',
        state: '',
        country: 'Brasil',
        zip_code: '',
        gender: 'not_specified',
        civil_status: 'not_specified',
        status: 'active',
        role: 'client'
      });
    }
  }, [open, client, setValue, reset]);

  const createClientMutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      console.log('Processing client data:', data);
      
      if (client?.id) {
        // Atualizar cliente existente usando Edge Function
        console.log('Updating existing client via Edge Function:', client.id);
        
        const { data: result, error } = await supabase.functions.invoke('atualizar-cliente', {
          method: 'PUT', // Método correto para atualização
          body: {
            id: client.id,
            full_name: data.full_name,
            cpf: data.cpf,
            phone: data.phone,
            mobile: data.mobile,
            birth_date: data.birth_date,
            person_type: data.person_type,
            document_id: data.document_id,
            cnpj: data.cnpj,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            zip_code: data.zip_code,
            gender: data.gender,
            civil_status: data.civil_status,
            status: data.status
          }
        });

        if (error) {
          console.error('Error calling Edge Function for update:', error);
          throw new Error(`Erro ao atualizar cliente: ${error.message}`);
        }

        if (!result?.success) {
          console.error('Edge Function returned error:', result);
          throw new Error(result?.error || 'Erro desconhecido ao atualizar cliente');
        }

        console.log('Client updated successfully via Edge Function:', result);
        return result;
      } else {
        // Criar novo cliente usando Edge Function
        console.log('Creating new client via Edge Function...');
        
        const { data: result, error } = await supabase.functions.invoke('criar-cliente', {
          body: {
            email: data.email,
            full_name: data.full_name,
            cpf: data.cpf,
            phone: data.phone,
            mobile: data.mobile,
            birth_date: data.birth_date,
            person_type: data.person_type,
            document_id: data.document_id,
            cnpj: data.cnpj,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            zip_code: data.zip_code,
            gender: data.gender,
            civil_status: data.civil_status,
            status: data.status
          }
        });

        if (error) {
          console.error('Error calling Edge Function:', error);
          throw new Error(`Erro ao criar cliente: ${error.message}`);
        }

        if (!result?.success) {
          console.error('Edge Function returned error:', result);
          throw new Error(result?.error || 'Erro desconhecido ao criar cliente');
        }

        console.log('Client created successfully via Edge Function:', result);
        return result;
      }
    },
    onSuccess: () => {
      console.log('Client mutation successful');
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] });
      if (client?.id) {
        toast({
          title: "Sucesso",
          description: "Cliente atualizado com sucesso.",
        });
      } else {
        toast({
          title: "Cliente criado com sucesso",
          description: `Cliente criado. Senha padrão: ${DEFAULT_PASSWORD}`,
        });
      }
      onOpenChange(false);
    },
    onError: (error: any) => {
      console.error('Client mutation error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar cliente.",
        variant: "destructive",
      });
    }
  });

  const handleSave = async (data: ClientFormData) => {
    console.log('Form submitted with data:', data);
    setIsLoading(true);
    try {
      await createClientMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error in handleSave:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setShowPassword(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Senha copiada para a área de transferência.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {client?.id ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
          <DialogDescription>
            {client?.id ? 'Edite as informações do cliente' : 'Preencha as informações para criar um novo cliente'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          {/* Mostrar campo de senha padrão apenas para novos clientes */}
          {!client?.id && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Senha Padrão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="default_password">Senha padrão para o cliente:</Label>
                    <div className="relative">
                      <Input
                        id="default_password"
                        type={showPassword ? "text" : "password"}
                        value={DEFAULT_PASSWORD}
                        readOnly
                        className="pr-20"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="h-6 w-6 p-0"
                        >
                          {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(DEFAULT_PASSWORD)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Esta senha padrão será usada pelo cliente para fazer login. O cliente pode alterá-la após o primeiro acesso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Nome Completo *</Label>
                      <Input
                        id="full_name"
                        {...register("full_name", { required: "Nome é obrigatório" })}
                      />
                      {errors.full_name && (
                        <span className="text-sm text-red-600">{errors.full_name.message}</span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email é obrigatório",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email inválido"
                          }
                        })}
                        disabled={!!client?.id}
                      />
                      {errors.email && (
                        <span className="text-sm text-red-600">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="person_type">Tipo de Pessoa</Label>
                      <Select
                        value={watch("person_type")}
                        onValueChange={(value) => setValue("person_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Pessoa Física</SelectItem>
                          <SelectItem value="company">Pessoa Jurídica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        {...register("cpf", { required: "CPF é obrigatório" })}
                      />
                      {errors.cpf && (
                        <span className="text-sm text-red-600">{errors.cpf.message}</span>
                      )}
                    </div>

                    {watch("person_type") === "company" && (
                      <div>
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                          id="cnpj"
                          {...register("cnpj")}
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="birth_date">Data de Nascimento</Label>
                      <Input
                        id="birth_date"
                        type="date"
                        {...register("birth_date")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="gender">Gênero</Label>
                      <Select
                        value={watch("gender")}
                        onValueChange={(value) => setValue("gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Feminino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                          <SelectItem value="not_specified">Não informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="civil_status">Estado Civil</Label>
                      <Select
                        value={watch("civil_status")}
                        onValueChange={(value) => setValue("civil_status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Solteiro(a)</SelectItem>
                          <SelectItem value="married">Casado(a)</SelectItem>
                          <SelectItem value="divorced">Divorciado(a)</SelectItem>
                          <SelectItem value="widowed">Viúvo(a)</SelectItem>
                          <SelectItem value="not_specified">Não informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="document_id">RG</Label>
                      <Input
                        id="document_id"
                        {...register("document_id")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={watch("status")}
                        onValueChange={(value) => setValue("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone Fixo</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobile">Celular</Label>
                      <Input
                        id="mobile"
                        {...register("mobile")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Textarea
                      id="address"
                      {...register("address")}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        {...register("city")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        {...register("state")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zip_code">CEP</Label>
                      <Input
                        id="zip_code"
                        {...register("zip_code")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        {...register("country")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleClose}>
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
