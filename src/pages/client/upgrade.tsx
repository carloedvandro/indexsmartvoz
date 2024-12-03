import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

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

      {/* Plans grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Plan 1 */}
        <Card className="relative overflow-hidden">
          <div className="bg-purple-700 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-600">VIVO CONTROLE</h3>
            <div className="mt-2 mb-4">
              <div className="text-4xl font-bold">14GB</div>
              <div className="text-sm text-gray-600">8GB + 6GB de bônus¹</div>
            </div>
            <div className="space-y-2 text-sm text-purple-600">
              <div>+ 5GB na Portabilidade²</div>
              <div>+ 6 meses de Amazon Prime de cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-2xl font-bold">R$ 55,00 /mês</div>
            </div>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              Contratar
            </Button>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between">
                <Switch id="social-media-1" />
                <label htmlFor="social-media-1" className="flex-1 ml-3 text-sm text-gray-600">
                  Adicione 8GB para suas redes sociais e vídeo por R$ 5
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <img src="/lovable-uploads/bfa9312d-ff2a-449b-8e42-ae90ad5d4939.png" alt="Social Media Icons" className="h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div>Apps ilimitados</div>
              <div className="text-gray-600">Sem consumo do seu pacote de internet¹</div>
            </div>
          </div>
        </Card>

        {/* Plan 2 */}
        <Card className="relative overflow-hidden">
          <div className="bg-purple-700 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-600">VIVO CONTROLE</h3>
            <div className="mt-2 mb-4">
              <div className="text-4xl font-bold">26GB</div>
              <div className="text-sm text-gray-600">10GB + 6GB de bônus¹</div>
            </div>
            <div className="space-y-2 text-sm text-purple-600">
              <div>+ 5GB na Portabilidade²</div>
              <div>+ 6 meses de Amazon Prime de cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-2xl font-bold">R$ 75,00 /mês</div>
            </div>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              Contratar
            </Button>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between">
                <Switch id="social-media-2" />
                <label htmlFor="social-media-2" className="flex-1 ml-3 text-sm text-gray-600">
                  Adicione 10GB para suas redes sociais e vídeo por R$ 5
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <img src="/lovable-uploads/bfa9312d-ff2a-449b-8e42-ae90ad5d4939.png" alt="Social Media Icons" className="h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div>Apps ilimitados</div>
              <div className="text-gray-600">Sem consumo do seu pacote de internet¹</div>
            </div>
          </div>
        </Card>

        {/* Plan 3 */}
        <Card className="relative overflow-hidden">
          <div className="bg-purple-700 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-600">VIVO CONTROLE SAÚDE</h3>
            <div className="mt-2 mb-4">
              <div className="text-4xl font-bold">26GB</div>
              <div className="text-sm text-gray-600">10GB + 6GB de bônus¹</div>
            </div>
            <div className="space-y-2 text-sm text-purple-600">
              <div>+ 5GB na Portabilidade²</div>
              <div>+ 6 meses de Amazon Prime de cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-2xl font-bold">R$ 85,00 /mês</div>
            </div>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              Contratar
            </Button>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between">
                <Switch id="social-media-3" />
                <label htmlFor="social-media-3" className="flex-1 ml-3 text-sm text-gray-600">
                  Adicione 10GB para suas redes sociais por R$ 5
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <img src="/lovable-uploads/bfa9312d-ff2a-449b-8e42-ae90ad5d4939.png" alt="Social Media Icons" className="h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div>Assinatura Vale Saúde Sempre inclusa</div>
              <div className="text-gray-600">Consultas e exames com até 70% de desconto</div>
            </div>
          </div>
        </Card>

        {/* Plan 4 */}
        <Card className="relative overflow-hidden">
          <div className="bg-purple-700 text-white px-4 py-1 text-sm">
            SEM FIDELIDADE
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-600">VIVO CONTROLE EDUCAÇÃO</h3>
            <div className="mt-2 mb-4">
              <div className="text-4xl font-bold">26GB</div>
              <div className="text-sm text-gray-600">10GB + 6GB de bônus¹</div>
            </div>
            <div className="space-y-2 text-sm text-purple-600">
              <div>+ 5GB na Portabilidade²</div>
              <div>+ 6 meses de Amazon Prime de cortesia³</div>
            </div>
            <div className="mt-6 mb-4">
              <div className="text-2xl font-bold">R$ 85,00 /mês</div>
            </div>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              Contratar
            </Button>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between">
                <Switch id="social-media-4" />
                <label htmlFor="social-media-4" className="flex-1 ml-3 text-sm text-gray-600">
                  Adicione 10GB para suas redes sociais por R$ 5
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <img src="/lovable-uploads/bfa9312d-ff2a-449b-8e42-ae90ad5d4939.png" alt="Social Media Icons" className="h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div>Assinatura Vivae inclusa</div>
              <div className="text-gray-600">Cursos online e certificados</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}