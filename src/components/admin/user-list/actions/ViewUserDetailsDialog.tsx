
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewUserDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export const ViewUserDetailsDialog = ({ isOpen, onOpenChange, user }: ViewUserDetailsDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  
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
        <DialogHeader>
          <DialogTitle className="text-lg">{user?.id ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
        </DialogHeader>
        
        <div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="personal" className="rounded-none">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-none">Contato</TabsTrigger>
              <TabsTrigger value="address" className="rounded-none">Endereço</TabsTrigger>
              <TabsTrigger value="other" className="rounded-none">Outros</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome Completo</label>
                  <Input 
                    placeholder="Nome Completo" 
                    defaultValue={user?.full_name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    defaultValue={user?.email || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                  <Input 
                    type="date" 
                    placeholder="dd/mm/aaaa"
                    defaultValue={user?.birth_date?.split('T')[0] || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Pessoa</label>
                  <Select defaultValue={user?.person_type || 'pf'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pf">Pessoa Física</SelectItem>
                      <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CPF</label>
                  <Input 
                    placeholder="CPF" 
                    defaultValue={user?.document_id || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CNPJ</label>
                  <Input 
                    placeholder="CNPJ" 
                    defaultValue={user?.cnpj || ''}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <Input 
                    placeholder="Telefone" 
                    defaultValue={user?.phone || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Celular</label>
                  <Input 
                    placeholder="Celular" 
                    defaultValue={user?.mobile || ''}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="address" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Endereço</label>
                  <Input 
                    placeholder="Endereço" 
                    defaultValue={user?.address || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CEP</label>
                  <Input 
                    placeholder="CEP" 
                    defaultValue={user?.zip_code || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cidade</label>
                  <Input 
                    placeholder="Cidade" 
                    defaultValue={user?.city || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estado</label>
                  <Input 
                    placeholder="Estado" 
                    defaultValue={user?.state || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">País</label>
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
            
            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status do fornecedor</label>
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
                <div>
                  <label className="block text-sm font-medium mb-1">Afiliado</label>
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
                <div>
                  <label className="block text-sm font-medium mb-1">Grupos</label>
                  <Input placeholder="Atribuir grupos" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {user?.id && (
            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                className="text-black"
                onClick={() => setShowPasswordInput(true)}
              >
                Definir Nova Senha
              </Button>
              <Button
                variant="outline"
                className="text-black"
              >
                Enviar Email de Reset
              </Button>
            </div>
          )}
          
          {showPasswordInput && (
            <div className="mt-4">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Nova Senha</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between mt-4 space-x-2">
          {user?.id && (
            <Button
              type="button"
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
