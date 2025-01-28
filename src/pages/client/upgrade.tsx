import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ClientUpgrade() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Confira aqui as melhores ofertas para você</h1>
        <p className="text-xl text-gray-600">
          Tenha a melhor rede móvel com velocidade 5G no seu plano Smartvoz Pós
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Plan 1 */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="bg-purple-600 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <div className="mt-2 mb-4">
              <div className="text-6xl font-bold">110GB</div>
              <div className="text-xl mt-2">Você + 1 Linha Adicional</div>
            </div>
            <div className="space-y-2 text-sm opacity-90">
              <div>100GB + 10GB de bônus¹</div>
              <div className="text-purple-300">+ 20GB de Portabilidade²</div>
              <div>1 ano de Amazon Prime de Cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-3xl font-bold">R$ 124,99 /mês</div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Contratar
            </Button>
          </div>
        </Card>

        {/* Plan 2 */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="bg-purple-600 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <div className="mt-2 mb-4">
              <div className="text-6xl font-bold">120GB</div>
              <div className="text-xl mt-2">Você + 2 Linhas Adicionais</div>
            </div>
            <div className="space-y-2 text-sm opacity-90">
              <div>100GB + 20GB de bônus²</div>
              <div className="text-purple-300">+ 30GB de Portabilidade²</div>
              <div>2 anos de Netflix de Cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-3xl font-bold">R$ 134,99 /mês</div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Contratar
            </Button>
          </div>
        </Card>

        {/* Plan 3 */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="bg-purple-600 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <div className="mt-2 mb-4">
              <div className="text-6xl font-bold">140GB</div>
              <div className="text-xl mt-2">Você + 3 Linhas Adicionais</div>
            </div>
            <div className="space-y-2 text-sm opacity-90">
              <div>100GB + 40GB de bônus³</div>
              <div className="text-purple-300">+ 50GB de Portabilidade²</div>
              <div>3 anos de Streaming de Cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-3xl font-bold">R$ 144,99 /mês</div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Contratar
            </Button>
          </div>
        </Card>
      </div>

      {/* Notas de rodapé */}
      <div className="mt-8 text-sm text-gray-500 space-y-1">
        <p>¹ Bônus promocional válido por 12 meses</p>
        <p>² GB extras exclusivos para clientes que realizarem portabilidade</p>
        <p>³ Benefício válido conforme regras da operadora</p>
      </div>
    </div>
  );
}