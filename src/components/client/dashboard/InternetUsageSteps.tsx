
import { Card } from "@/components/ui/card";

export const InternetUsageSteps = () => {
  const steps = [
    {
      number: 1,
      text: "Acesse o App Vivo no seu celular",
      color: "text-gray-700"
    },
    {
      number: 2,
      text: "No menu, clique em Meu Plano",
      color: "text-[#8425af]"
    },
    {
      number: 3,
      text: "Pronto! Aqui você irá visualizar todos os detalhes do seu consumo",
      color: "text-[#8425af]"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-black">
        <h1 className="text-4xl font-light mb-4">
          Passo a passo | Consultar consumo de internet móvel
        </h1>
        <p className="text-gray-600">
          Veja como é fácil consultar seu consumo de internet direto pelo App Vivo!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-gray-600">{step.number}</span>
              </div>
              <p className={`${step.color} text-lg mt-1`}>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <Card className="overflow-hidden">
            <div className="bg-[#8425af] text-white p-4">
              <p className="text-sm">Minha franquia renova em 11 dias</p>
              <p>Faturamento 11/nov - 10/dez</p>
            </div>
            <div className="p-4">
              <div className="flex space-x-4 border-b mb-4">
                <button className="px-4 py-2 text-[#8425af] border-b-2 border-[#8425af]">
                  Internet
                </button>
                <button className="px-4 py-2 text-gray-500">
                  Minutos
                </button>
                <button className="px-4 py-2 text-gray-500">
                  SMS
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-2">
                    Internet pra usar como quiser
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        🌐
                      </div>
                      <div>
                        <p className="text-sm">Já usei 129 MB de 3 GB</p>
                        <p className="text-xs text-gray-500">BÔNUS CONTA DIGITAL</p>
                        <p className="text-xs text-gray-500">Renova em 10/dez</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        🌐
                      </div>
                      <div>
                        <p className="text-sm">Já usei 0 MB de 6 GB</p>
                        <p className="text-xs text-gray-500">Meu Plano</p>
                        <p className="text-xs text-gray-500">Renova em 10/dez</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase mb-2">
                    Apps pra usar ilimitado
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">📱</span>
                      <span className="text-xs">Whatsapp</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">🗺️</span>
                      <span className="text-xs">Waze</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">🚗</span>
                      <span className="text-xs">Cabify</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">🚕</span>
                      <span className="text-xs">Easy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
