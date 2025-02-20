
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewPhoneLine {
  phone_number: string;
  client_name: string;
  client_document: string;
  client_email: string;
  plan_name: string;
  plan_code: string;
  data_limit: number;
  status: string;
}

interface AddPhoneLineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (line: NewPhoneLine) => Promise<void>;
}

export function AddPhoneLineDialog({ isOpen, onClose, onAdd }: AddPhoneLineDialogProps) {
  const [newLine, setNewLine] = useState<NewPhoneLine>({
    phone_number: "",
    client_name: "",
    client_document: "",
    client_email: "",
    plan_name: "",
    plan_code: "",
    data_limit: 0,
    status: "active"
  });

  const handlePhoneNumberChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length <= 11) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      setNewLine({ ...newLine, phone_number: formattedValue });
    }
  };

  const handleSubmit = async () => {
    await onAdd(newLine);
    setNewLine({
      phone_number: "",
      client_name: "",
      client_document: "",
      client_email: "",
      plan_name: "",
      plan_code: "",
      data_limit: 0,
      status: "active"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Linha</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="phone_number">Número do Telefone</Label>
            <Input
              id="phone_number"
              value={newLine.phone_number}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="client_name">Nome do Cliente</Label>
            <Input
              id="client_name"
              value={newLine.client_name}
              onChange={(e) => setNewLine({ ...newLine, client_name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="client_document">Documento</Label>
            <Input
              id="client_document"
              value={newLine.client_document}
              onChange={(e) => setNewLine({ ...newLine, client_document: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="client_email">Email</Label>
            <Input
              id="client_email"
              type="email"
              value={newLine.client_email}
              onChange={(e) => setNewLine({ ...newLine, client_email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan_name">Nome do Plano</Label>
            <Input
              id="plan_name"
              value={newLine.plan_name}
              onChange={(e) => setNewLine({ ...newLine, plan_name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan_code">Código do Plano</Label>
            <Input
              id="plan_code"
              value={newLine.plan_code}
              onChange={(e) => setNewLine({ ...newLine, plan_code: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="data_limit">Limite de Dados (GB)</Label>
            <Input
              id="data_limit"
              type="number"
              value={newLine.data_limit}
              onChange={(e) => setNewLine({ ...newLine, data_limit: Number(e.target.value) })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
