import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientChipActivation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Ativação do Chip do Plano</h1>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Tenha os novos chips SIM cards com você</h2>
                <p className="text-gray-600">
                  Compre nas lojas Vivo, pela Central de Relacionamento ou via Gerente que atende sua empresa
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Vamos confirmar sua identidade</h2>
                <p className="text-gray-600">
                  Isso deixa o processo e seus dados ainda mais seguros
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Só coloque os chips SIM cards nos aparelhos quando concluir a troca</h2>
                <p className="text-gray-600">
                  Assim você tem certeza de que a linha da sua empresa já está vinculada ao novo chip SIM card
                </p>
              </div>

              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-medium">Precisa trocar ou ativar o chip virtual eSIM?</h3>
                <p className="text-gray-600">
                  Clique em Voltar e procure pela linha. Depois, acesse Gerenciar linha e escolha Trocar pra eSIM ou Ativar eSIM
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-[#8425af] hover:bg-[#6c1e8f]">
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}