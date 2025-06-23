
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface CreateAsaasAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    full_name: string;
    email: string;
    cpf?: string;
    asaas_account_id?: string;
  };
  onSuccess?: () => void;
}

export function CreateAsaasAccountDialog({
  isOpen,
  onClose,
  user,
  onSuccess
}: CreateAsaasAccountDialogProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateAccount = async () => {
    try {
      setIsCreating(true);

      const { data, error } = await supabase.functions.invoke('criar-subconta-asaas', {
        body: {
          userId: user.id
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Sucesso",
          description: `Subconta Asaas criada para ${user.full_name}`,
        });
        
        onSuccess?.();
        onClose();
      } else {
        throw new Error(data?.error || 'Erro desconhecido');
      }
    } catch (error: any) {
      console.error('Erro ao criar subconta:', error);
      
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar subconta Asaas",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Subconta Asaas</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-blue-900">Criar subconta para:</h4>
                <p className="text-sm text-blue-700 mt-1">
                  <strong>Nome:</strong> {user.full_name}
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Email:</strong> {user.email}
                </p>
                {user.cpf && (
                  <p className="text-sm text-blue-700">
                    <strong>CPF:</strong> {user.cpf}
                  </p>
                )}
              </div>
            </div>
          </div>

          {user.asaas_account_id && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium text-green-900">Subconta já existe</h4>
                  <p className="text-sm text-green-700 mt-1">
                    ID: {user.asaas_account_id}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-yellow-900">Atenção</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Esta ação criará uma subconta no Asaas Sandbox para o usuário poder receber comissões automaticamente.
                </p>
                <p className="text-sm text-yellow-700 mt-2">
                  Certifique-se de que o usuário já aceitou os termos de uso.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isCreating}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateAccount} 
              disabled={isCreating || !!user.asaas_account_id}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Subconta'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
