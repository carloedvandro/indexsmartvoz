
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/format";

export default function Financial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost"
            onClick={() => navigate("/client/dashboard")}
            className="text-gray-600"
          >
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#5f0889]" />
            <h1 className="text-2xl font-semibold text-gray-800">FINANCEIRO</h1>
          </div>
        </div>

        <Card className="p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Resumo</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Filtros</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Mês</label>
                <Select>
                  <option value="2">Fevereiro</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Ano</label>
                <Select>
                  <option value="2025">2025</option>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="bg-[#00A3D3] hover:bg-[#0089B3]">
                  Filtrar
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total de bônus recebido em Fevereiro/2025</span>
                <span className="font-semibold">{formatCurrency(42576.22)}</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total de saldo <span className="text-red-500">bloqueado</span></span>
                <span className="font-semibold">{formatCurrency(0)}</span>
              </div>
            </div>

            <div className="p-4 border-2 border-green-500 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">Saldo disponível</span>
                <span className="font-semibold text-lg">{formatCurrency(5000.01)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Tecnologia por WI Digital
          </div>
        </Card>
      </div>
    </div>
  );
}
