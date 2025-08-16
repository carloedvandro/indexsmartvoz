
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Benefit {
  id?: any;
  title: string;
  display_order: number;
}

interface BenefitsListProps {
  benefits: Benefit[];
  onEdit: (benefit: Benefit) => void;
  onDelete: (id: any) => void;
}

export function BenefitsList({ benefits, onEdit, onDelete }: BenefitsListProps) {
  if (benefits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum benefício adicionado
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {benefits
        .sort((a, b) => a.display_order - b.display_order)
        .map((benefit) => (
        <div key={benefit.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-medium">{benefit.title}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Ordem: {benefit.display_order}
                </span>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onEdit(benefit)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onDelete(benefit.id)}
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
