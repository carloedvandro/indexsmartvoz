
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CircleUser } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewUserDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export const ViewUserDetailsDialog = ({ isOpen, onOpenChange, user }: ViewUserDetailsDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: "Informações do usuário atualizadas",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar informações",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-2">
          <div className="bg-indigo-700 p-1.5 rounded-full">
            <CircleUser className="h-5 w-5 text-white" />
          </div>
          <DialogTitle className="text-lg">Adicionar Usuário</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-2">
          <div className="flex gap-2">
            <Button variant="outline" className="bg-indigo-100 text-indigo-900">
              Usuário
            </Button>
            <Button variant="outline">
              Adicionar Transação
            </Button>
          </div>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="other">Outros</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input 
                    id="first-name" 
                    placeholder="Nome" 
                    defaultValue={user?.full_name?.split(' ')[0] || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last-name">Sobrenome</Label>
                  <Input 
                    id="last-name" 
                    placeholder="Sobrenome" 
                    defaultValue={user?.full_name?.split(' ').slice(1).join(' ') || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                    defaultValue={user?.email || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status">Status do fornecedor</Label>
                  <Select defaultValue={user?.status || 'active'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="blocked">Desabilitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    placeholder="+55 (00) 00000-0000" 
                    defaultValue={user?.phone || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="custom-id">ID Personalizado</Label>
                  <Input 
                    id="custom-id" 
                    placeholder="ID Personalizado" 
                    defaultValue={user?.custom_id || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Senha" 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirmar Senha" 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    placeholder="Telefone" 
                    defaultValue={user?.phone || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mobile">Celular</Label>
                  <Input 
                    id="mobile" 
                    placeholder="Celular" 
                    defaultValue={user?.mobile || ''}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="address" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="address">Endereço</Label>
                  <Input 
                    id="address" 
                    placeholder="Endereço" 
                    defaultValue={user?.address || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">Cidade</Label>
                  <Input 
                    id="city" 
                    placeholder="Cidade" 
                    defaultValue={user?.city || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">Estado</Label>
                  <Input 
                    id="state" 
                    placeholder="Estado" 
                    defaultValue={user?.state || ''}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">País</Label>
                  <Select defaultValue={user?.country || 'Brasil'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brasil">Brasil</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="sponsor">Afiliado</Label>
                  <Select defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um afiliado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      {/* Optionally populate with actual sponsors */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="user-group">Grupos</Label>
                  <Input 
                    id="user-group" 
                    placeholder="Atribuir grupos" 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
