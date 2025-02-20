
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Phone, Signal, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PhoneLine {
  id: string;
  phone_number: string;
  client_name: string;
  client_email: string | null;
  client_document: string | null;
  plan_name: string;
  data_limit: number;
  data_used: number;
  bonus_data: number | null;
  bonus_used: number | null;
  status: string;
}

export const PhoneLineManager = () => {
  const [lines, setLines] = useState<PhoneLine[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLine, setNewLine] = useState({
    phone_number: '',
    client_name: '',
    client_email: '',
    client_document: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadPhoneLines = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data, error } = await supabase
        .from('phone_lines')
        .select('*')
        .eq('owner_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLines(data || []);
    } catch (error) {
      console.error('Erro ao carregar linhas:', error);
      toast.error('Erro ao carregar suas linhas');
    }
  };

  useEffect(() => {
    loadPhoneLines();
  }, []);

  const handleAddLine = async () => {
    try {
      setIsLoading(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        toast.error('Sessão expirada');
        return;
      }

      const { error } = await supabase.from('phone_lines').insert({
        owner_id: session.session.user.id,
        phone_number: newLine.phone_number,
        client_name: newLine.client_name,
        client_email: newLine.client_email || null,
        client_document: newLine.client_document || null,
        plan_name: 'Controle 15GB',
        plan_code: 'CTRL15',
        data_limit: 15360, // 15GB em MB
        data_used: 0,
        bonus_data: 5120, // 5GB em MB
        bonus_used: 0,
        status: 'active'
      });

      if (error) throw error;

      toast.success('Linha adicionada com sucesso!');
      setIsAddDialogOpen(false);
      setNewLine({
        phone_number: '',
        client_name: '',
        client_email: '',
        client_document: '',
      });
      loadPhoneLines();
    } catch (error) {
      console.error('Erro ao adicionar linha:', error);
      toast.error('Erro ao adicionar linha');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDataUsage = (used: number, total: number) => {
    const usedGB = (used / 1024).toFixed(1);
    const totalGB = (total / 1024).toFixed(1);
    return `${usedGB}GB de ${totalGB}GB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Minhas Linhas</h2>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Linha
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lines.map((line) => (
          <Card key={line.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#8425af]" />
                <span className="font-medium">{line.phone_number}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                line.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {line.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Cliente: {line.client_name}</p>
              {line.client_email && (
                <p className="text-sm text-gray-600">Email: {line.client_email}</p>
              )}
              <div className="flex items-center gap-2">
                <Signal className="h-4 w-4 text-[#8425af]" />
                <span className="text-sm">{formatDataUsage(line.data_used, line.data_limit)}</span>
              </div>
              {line.bonus_data && line.bonus_data > 0 && (
                <div className="text-sm text-orange-600">
                  Bônus: {formatDataUsage(line.bonus_used || 0, line.bonus_data)}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Linha</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Número do Telefone</label>
              <Input
                placeholder="(00) 00000-0000"
                value={newLine.phone_number}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 11) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                    setNewLine({ ...newLine, phone_number: value });
                  }
                }}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Nome do Cliente</label>
              <Input
                placeholder="Nome completo"
                value={newLine.client_name}
                onChange={(e) => setNewLine({ ...newLine, client_name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email do Cliente (opcional)</label>
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={newLine.client_email}
                onChange={(e) => setNewLine({ ...newLine, client_email: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Documento do Cliente (opcional)</label>
              <Input
                placeholder="CPF ou CNPJ"
                value={newLine.client_document}
                onChange={(e) => setNewLine({ ...newLine, client_document: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddLine}
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              disabled={isLoading}
            >
              {isLoading ? <RefreshCw className="h-4 w-4 animate
-spin" /> : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
