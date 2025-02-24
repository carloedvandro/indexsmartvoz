
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DollarSign, Filter } from "lucide-react";
import { formatCurrency } from "@/utils/format";

export default function Financial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-[800px] mx-auto">
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

        <Card className="p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Resumo</h2>

          <div className="mb-6 border rounded-lg">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filtros</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Mês</label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue>Fevereiro</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Fevereiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Ano</label>
                  <Select defaultValue="2025">
                    <SelectTrigger>
                      <SelectValue>2025</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="bg-[#00A3D3] hover:bg-[#0089B3] text-white w-full">
                    Filtrar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Total de bônus recebido em Fevereiro/2025</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 text-sm">R$</span>
                  <span className="text-gray-900 font-medium">42.576,22</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 text-sm">Total de saldo</span>
                  <span className="text-red-500 text-sm">bloqueado</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 text-sm">R$</span>
                  <span className="text-gray-900 font-medium">0,00</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 border-green-500 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">Saldo disponível</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 text-sm">R$</span>
                  <span className="text-gray-900 font-medium">5.000,01</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Tecnologia por WI Digital
          </div>
        </Card>
      </div>
    </div>
  );
}
