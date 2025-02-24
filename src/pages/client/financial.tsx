
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DollarSign, Filter } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";

export default function Financial() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("2");
  const [selectedYear, setSelectedYear] = useState("2025");

  const months = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" }
  ];

  // Gerando anos de 2017 até o ano atual + 1
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2017 + 2 }, (_, index) => {
    const year = (2017 + index).toString();
    return { value: year, label: year };
  });

  const handleFilter = () => {
    console.log("Filtering with:", { month: selectedMonth, year: selectedYear });
    // Aqui você pode implementar a lógica de filtro
  };

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

        <h2 className="text-xl font-semibold mb-6 text-gray-700">Resumo</h2>

        <div className="mb-6 border rounded-lg">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtros</span>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Mês</label>
                <Select 
                  defaultValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ano</label>
                <Select 
                  defaultValue={selectedYear}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  className="bg-[#5f0889] hover:bg-[#4a0669] text-white w-full"
                  onClick={handleFilter}
                >
                  Filtrar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 bg-white rounded-lg p-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-gray-700">Total de bônus recebido em {months.find(m => m.value === selectedMonth)?.label} /</span>
              <span className="text-gray-700">{selectedYear}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-700">R$</span>
              <span className="text-gray-900 text-lg font-medium">42.576,22</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-1">
              <span className="text-gray-700">Total de saldo</span>
              <span className="text-red-500">bloqueado</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-700">R$</span>
              <span className="text-gray-900 text-lg font-medium">0,00</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-gray-900 font-medium text-lg">Saldo disponível</span>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-700">R$</span>
              <span className="text-gray-900 text-lg font-medium">5.000,01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
