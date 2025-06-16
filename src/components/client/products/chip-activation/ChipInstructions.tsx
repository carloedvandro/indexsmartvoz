
import { Card, CardContent } from "@/components/ui/card";

export function ChipInstructions() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Tenha o novo chip SIM card com você</h2>
        <p className="text-gray-600">
          Compre o chip pré-pago sem cadastro nas lojas de qualquer comércio. Não pode comprar nas lojas Vivo.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Só coloque o chip SIM card no aparelho quando concluir a troca</h2>
        <p className="text-gray-600">
          Assim você tem certeza de que a linha já está vinculada ao novo chip SIM card
        </p>
      </div>
    </div>
  );
}
