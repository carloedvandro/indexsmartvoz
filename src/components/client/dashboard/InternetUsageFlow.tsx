
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

export const InternetUsageFlow = () => {
  const phoneData = {
    number: "(99) 99999-9999",
    plan: {
      name: "Controle",
      internet: {
        total: 15,
        used: 7.5,
        bonusUsed: 0.129,
        bonusTotal: 3,
        planUsed: 0,
        planTotal: 6
      },
      renewalDate: "11 dias",
      billing: {
        period: "11/nov - 10/dez",
        amount: 50.99,
        dueDate: "15/out"
      }
    },
    unlimitedApps: [
      { name: "Whatsapp", icon: "🟢" },
      { name: "Waze", icon: "🟦" },
      { name: "Cabify", icon: "🟣" },
      { name: "Easy", icon: "🟡" }
    ]
  };

  return (
    <Card className="bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#8425af] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="h-5 w-5" />
            <span>Consumo do celular</span>
          </div>
          <RefreshCw className="h-5 w-5" />
        </div>
        <div className="mt-2">
          <p className="text-sm">Minha franquia renova em {phoneData.plan.renewalDate}</p>
          <p className="text-lg">Faturamento {phoneData.plan.billing.period}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          <button className="px-6 py-3 text-[#8425af] border-b-2 border-[#8425af] font-medium">
            Internet
          </button>
          <button className="px-6 py-3 text-gray-500">
            Minutos
          </button>
          <button className="px-6 py-3 text-gray-500">
            SMS
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        <div>
          <p className="text-sm text-gray-500 mb-4">INTERNET PRA USAR COMO QUISER</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                🌐
              </div>
              <div>
                <p className="text-sm">Já usei {phoneData.plan.internet.bonusUsed} GB de {phoneData.plan.internet.bonusTotal} GB</p>
                <p className="text-xs text-gray-500">BÔNUS CONTA DIGITAL</p>
                <p className="text-xs text-gray-500">Renova em 10/dez</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                🌐
              </div>
              <div>
                <p className="text-sm">Já usei {phoneData.plan.internet.planUsed} MB de {phoneData.plan.internet.planTotal} GB</p>
                <p className="text-xs text-gray-500">Meu Plano</p>
                <p className="text-xs text-gray-500">Renova em 10/dez</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-4">APPS PRA USAR ILIMITADO</p>
          <div className="grid grid-cols-4 gap-4">
            {phoneData.unlimitedApps.map((app, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl mb-1">{app.icon}</span>
                <span className="text-xs">{app.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-green-600">Fatura paga</p>
              <p className="text-sm text-gray-500">Vence em {phoneData.plan.billing.dueDate}</p>
            </div>
            <p className="text-xl font-semibold">{formatCurrency(phoneData.plan.billing.amount)}</p>
          </div>
          <div className="flex justify-between mt-4">
            <Button className="bg-[#8425af] hover:bg-[#6c1e8f]">
              Pagar agora
            </Button>
            <Button variant="link" className="text-[#8425af]">
              Ver faturas
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
