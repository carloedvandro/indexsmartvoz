import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { validatePasswordStrength } from "@/utils/passwordValidation";
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

// Function to generate a strong random password
const generateStrongPassword = (): string => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  // Ensure at least one character from each required category
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // lowercase
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // uppercase
  password += "0123456789"[Math.floor(Math.random() * 10)]; // number
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)]; // special character
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export function ClientFormDialog({ open, onOpenChange, client }: ClientFormDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ClientFormData>({
    defaultValues: {
      email: client?.email || '',
      full_name: client?.full_name || '',
      cpf: client?.cpf || '',
      phone: client?.phone || '',
      mobile: client?.mobile || '',
      birth_date: client?.birth_date || '',
      person_type: client?.person_type || 'individual',
      document_id: client?.document_id || '',
      cnpj: client?.cnpj || '',
      address: client?.address || '',
      city: client?.city || '',
      state: client?.state || '',
      country: client?.country || 'Brasil',
      zip_code: client?.zip_code || '',
      gender: client?.gender || 'not_specified',
      civil_status: client?.civil_status || 'not_specified',
      status: client?.status || 'active',
      role: 'client'
    }
  });

  const createClientMutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      console.log('Creating client with data:', data);
      
      if (client?.id) {
        // Atualizar cliente existente
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: data.full_name,
            cpf: data.cpf,
            phone: data.phone,
            mobile: data.mobile,
            birth_date: data.birth_date || null,
            person_type: data.person_type,
            document_id: data.document_id,
            cnpj: data.cnpj || null,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            zip_code: data.zip_code,
            gender: data.gender,
            civil_status: data.civil_status,
            status: data.status
          })
          .eq('id', client.id);
          
        if (error) {
          console.error('Error updating client:', error);
          throw error;
        }
      } else {
        // Criar novo cliente
        console.log('Creating new user with email:', data.email);
        
        // Generate a strong password
        const strongPassword = generateStrongPassword();
        console.log('Generated strong password for new user');
        setGeneratedPassword(strongPassword);
        
        // Validate the generated password
        const passwordValidation = validatePasswordStrength(strongPassword);
        if (!passwordValidation.isValid) {
          throw new Error(`Erro na geração de senha: ${passwordValidation.message}`);
        }
        
        // Use the service role to create user without affecting current session
        const { data: authData, error: authError } = await supabase.rpc('admin_create_user', {
          user_email: data.email,
          user_password: strongPassword,
          user_metadata: {
            full_name: data.full_name,
          }
        });

        // If RPC doesn't exist, fallback to regular signup but logout after
        if (authError && authError.message.includes('function')) {
          console.log('Fallback to regular signup');
          
          // Store current session
          const { data: currentSession } = await supabase.auth.getSession();
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: data.email,
            password: strongPassword,
            options: {
              data: {
                full_name: data.full_name,
              },
            },
          });

          if (signUpError) {
            console.error('Auth error:', signUpError);
            throw new Error(`Erro na autenticação: ${signUpError.message}`);
          }

          if (!signUpData.user) {
            console.error('No user data returned from auth');
            throw new Error('Erro ao criar usuário - dados não retornados');
          }

          console.log('User created, updating profile with ID:', signUpData.user.id);

          // Update profile with complete data
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              full_name: data.full_name,
              cpf: data.cpf,
              phone: data.phone,
              mobile: data.mobile,
              birth_date: data.birth_date || null,
              person_type: data.person_type,
              document_id: data.document_id,
              cnpj: data.cnpj || null,
              address: data.address,
              city: data.city,
              state: data.state,
              country: data.country,
              zip_code: data.zip_code,
              gender: data.gender,
              civil_status: data.civil_status,
              status: data.status,
              role: 'client'
            })
            .eq('id', signUpData.user.id);

          if (profileError) {
            console.error('Profile update error:', profileError);
            throw new Error(`Erro ao atualizar perfil: ${profileError.message}`);
          }

          // Sign out the newly created user and restore admin session
          await supabase.auth.signOut();
          
          if (currentSession?.session) {
            await supabase.auth.setSession(currentSession.session);
          }

          console.log('Profile updated successfully and admin session restored');
        } else if (authError) {
          throw new Error(`Erro na criação do usuário: ${authError.message}`);
        }
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
          description: "Cliente criado. A senha temporária está exibida no formulário para cópia.",
        });
      }
      onOpenChange(false);
      reset();
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
    reset();
    setGeneratedPassword("");
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
          {/* Show generated password field for new clients */}
          {!client?.id && generatedPassword && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Senha Temporária Gerada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="generated_password">Senha para o cliente:</Label>
                    <div className="relative">
                      <Input
                        id="generated_password"
                        type={showPassword ? "text" : "password"}
                        value={generatedPassword}
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
                          onClick={() => copyToClipboard(generatedPassword)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Informe esta senha ao cliente para que ele possa fazer login e alterá-la na primeira utilização.
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
