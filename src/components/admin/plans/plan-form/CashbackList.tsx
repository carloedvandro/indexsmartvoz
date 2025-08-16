
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

interface CashbackListProps {
  cashbackLevels: any[];
  onEdit: (cashback: any) => void;
  onDelete: (id: any) => void;
}

export function CashbackList({ cashbackLevels, onEdit, onDelete }: CashbackListProps) {
  const formatValue = (level: any) => {
    if (level.valueType === 'fixed' && level.amount !== null && level.amount !== undefined) {
      return `R$ ${Number(level.amount).toFixed(2)}`;
    } else if (level.valueType === 'percentage' && level.percentage !== null && level.percentage !== undefined) {
      return `${Number(level.percentage).toFixed(2)}%`;
    }
    return 'N/A';
  };

  const getValueType = (level: any) => {
    if (level.valueType === 'fixed') {
      return 'Valor Fixo';
    } else if (level.valueType === 'percentage') {
      return 'Percentual';
    }
    return 'N/A';
  };

  if (!cashbackLevels || cashbackLevels.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum nível de cashback configurado</p>
        <p className="text-sm">Adicione pelo menos um nível de cashback</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cashbackLevels.map((level) => (
        <Card key={level.id} className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="font-medium text-gray-900">
                    Nível {level.level}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getValueType(level)}: <span className="font-medium">{formatValue(level)}</span>
                  </div>
                </div>
                {level.description && (
                  <div className="text-sm text-gray-500 mt-1">
                    {level.description}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(level)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(level.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
