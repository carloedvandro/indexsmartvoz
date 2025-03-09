import { Button } from "@/components/ui/button";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
};

interface OrderReviewStepProps {
  selectedLines: Line[];
}

export function OrderReviewStep({ selectedLines }: OrderReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium">Confirme seu pedido</h2>
        <p className="text-gray-600">
          Revise os planos selecionados e os valores antes de prosseguir
        </p>
      </div>

      <div className="space-y-4">
        {selectedLines.map((line) => (
          <div key={line.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">
                  {line.id === 1 || line.id === 2 ? "Plano Smartvoz" : `Linha ${String(line.id).padStart(2, '0')}`}
                </span>
                <span className="ml-2">{line.internet}</span>
              </div>
              <span className="font-medium">R$ {line.price.toFixed(2)}/mês</span>
            </div>
          </div>
        ))}

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center font-medium">
            <span>Total mensal:</span>
            <span>R$ {(selectedLines.reduce((acc, line) => acc + line.price, 0)).toFixed(2)}/mês</span>
          </div>
        </div>
      </div>
    </div>
  );
}