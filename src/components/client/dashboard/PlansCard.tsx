import { Card } from "@/components/ui/card";

export function PlansCard() {
  return (
    <Card className="h-full">
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Planos</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Plano atual:</span>
            <span className="font-medium">Gratuito</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Próximo pagamento:</span>
            <span className="font-medium">-</span>
          </div>
        </div>
      </div>
    </Card>
  );
}