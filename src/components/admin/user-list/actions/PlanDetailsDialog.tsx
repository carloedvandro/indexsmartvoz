
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/format";

interface PlanDetailsDialogProps {
  user: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlanDetailsDialog({ user, isOpen, onOpenChange }: PlanDetailsDialogProps) {
  const planDetails = user?.plan || {
    name: "Plano básico",
    price: 99.90,
    features: ["Acesso à plataforma", "1 Linha ativa", "Suporte básico"]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Plano</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{planDetails.name}</h3>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(planDetails.price)}
            </span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Recursos inclusos:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {planDetails.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              Usuário: {user?.fullName || user?.email || "Nome não disponível"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
