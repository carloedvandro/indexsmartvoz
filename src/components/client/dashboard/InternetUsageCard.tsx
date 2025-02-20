
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Phone, RefreshCcw, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InternetUsageCard = () => {
  // Dados simulados do plano
  const planData = {
    phoneNumber: "(99) 99999-9999",
    totalData: 15,
    usedData: 7.5,
    renewalDate: "15/out",
    monthlyFee: 50.99,
    apps: [
      { name: "WhatsApp", icon: "🟢" },
      { name: "Waze", icon: "🟦" },
      { name: "Cabify", icon: "🟣" },
      { name: "Easy", icon: "🟡" },
    ]
  };

  const progressPercentage = (planData.usedData / planData.totalData) * 100;

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">{planData.phoneNumber}</span>
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-purple-600"
                strokeWidth="10"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (progressPercentage * 251.2) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold">{planData.usedData} GB</div>
              <div className="text-xs text-gray-500">de {planData.totalData} GB</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm">Internet pra usar como quiser</p>
          <p className="text-xs text-gray-500">Renova em {planData.renewalDate}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <Button variant="outline" className="flex flex-col items-center p-3">
            <Package className="h-5 w-5 mb-1" />
            <span className="text-xs">Detalhe do plano</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-3">
            <ArrowRight className="h-5 w-5 mb-1" />
            <span className="text-xs">Trocar de plano</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-3">
            <Package className="h-5 w-5 mb-1" />
            <span className="text-xs">Pacotes adicionais</span>
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Fatura paga</span>
            <span className="text-sm">Vence em {planData.renewalDate}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold">R$ {planData.monthlyFee.toFixed(2)}</span>
            <div className="space-x-2">
              <Button variant="default" size="sm">Pagar agora</Button>
              <Button variant="link" size="sm">Ver faturas</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">Apps pra usar ilimitado:</p>
          <div className="flex justify-between">
            {planData.apps.map((app, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl mb-1">{app.icon}</span>
                <span className="text-xs">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
