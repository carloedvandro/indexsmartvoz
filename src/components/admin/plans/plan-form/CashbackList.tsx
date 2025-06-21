
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface CashbackLevel {
  id?: any;
  level: number;
  percentage?: number;
  fixedValue?: number;
  valueType?: 'percentage' | 'fixed';
  description: string;
}

interface CashbackListProps {
  cashbackLevels: CashbackLevel[];
  onEdit: (cashback: CashbackLevel) => void;
  onDelete: (id: any) => void;
}

export function CashbackList({ cashbackLevels, onEdit, onDelete }: CashbackListProps) {
  if (cashbackLevels.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum nível de cashback adicionado
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getValueDisplay = (cashback: CashbackLevel) => {
    if (cashback.fixedValue !== undefined && cashback.fixedValue !== null) {
      return formatCurrency(cashback.fixedValue);
    } else if (cashback.percentage !== undefined && cashback.percentage !== null) {
      return `${cashback.percentage}%`;
    }
    return 'N/A';
  };

  const getValueType = (cashback: CashbackLevel) => {
    if (cashback.fixedValue !== undefined && cashback.fixedValue !== null) {
      return 'Valor Fixo';
    } else if (cashback.percentage !== undefined && cashback.percentage !== null) {
      return 'Percentual';
    }
    return 'N/A';
  };

  return (
    <div className="space-y-3">
      {cashbackLevels.map((cashback) => (
        <div key={cashback.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-medium">Nível {cashback.level}</span>
                <span className="font-bold text-green-600">{getValueDisplay(cashback)}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {getValueType(cashback)}
                </span>
              </div>
              {cashback.description && (
                <p className="text-sm text-gray-600">{cashback.description}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onEdit(cashback)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onDelete(cashback.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
