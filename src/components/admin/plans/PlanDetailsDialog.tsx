
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PlanDetailsDialogProps {
  plan: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlanDetailsDialog({ plan, open, onOpenChange }: PlanDetailsDialogProps) {
  if (!plan) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan.title}</DialogTitle>
          <DialogDescription>
            Detalhes completos do plano
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações Básicas</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Valor</label>
                <p className="text-lg font-semibold">{formatCurrency(plan.value)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                    {plan.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>

            {plan.description && (
              <div>
                <label className="text-sm font-medium text-gray-600">Descrição</label>
                <p className="mt-1 text-gray-900">{plan.description}</p>
              </div>
            )}
          </div>

          {/* Níveis de Cashback */}
          {plan.cashback_levels && plan.cashback_levels.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Níveis de Cashback</h3>
              <div className="space-y-3">
                {plan.cashback_levels.map((level: any) => (
                  <div key={level.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Nível {level.level}</span>
                      <span className="font-bold text-green-600">{level.percentage}%</span>
                    </div>
                    {level.description && (
                      <p className="text-sm text-gray-600">{level.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefícios */}
          {plan.benefits && plan.benefits.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Benefícios</h3>
              <div className="space-y-3">
                {plan.benefits.map((benefit: any) => (
                  <div key={benefit.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{benefit.benefit_title}</h4>
                    {benefit.benefit_description && (
                      <p className="text-sm text-gray-600">{benefit.benefit_description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informações de Criação */}
          <div className="space-y-2 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Criado em: {new Date(plan.created_at).toLocaleDateString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">
              Última atualização: {new Date(plan.updated_at).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
