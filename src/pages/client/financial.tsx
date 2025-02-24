import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

export default function Financial() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("2");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [showFinancialData, setShowFinancialData] = useState(false);
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);

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

  const years = [
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
  ];

  const handleFilter = () => {
    setShowFinancialData(true);
    console.log("Filtering with:", { month: selectedMonth, year: selectedYear });
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 px-6">
        <div className="h-full flex items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-semibold text-gray-800 leading-tight">Financeiro</h1>
            <h2 className="text-sm text-gray-600">Resumo</h2>
          </div>
        </div>
      </div>

      <div className="max-w-[530px] mx-auto mt-[110px]">
        <div className="sticky top-[80px] z-40 p-6 pb-0">
          <div className="mb-6 border rounded-lg bg-white">
            <div className="py-2 px-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#5f0889]" />
                <span className="text-sm font-medium text-gray-900">Filtros</span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 p-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-900 mb-1">Mês</label>
                <Select 
                  defaultValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {months.map((month) => (
                      <SelectItem 
                        key={month.value} 
                        value={month.value}
                        className="hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white"
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-900 mb-1">Ano</label>
                <Select 
                  defaultValue={selectedYear}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 pl-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {years.map((year) => (
                      <SelectItem 
                        key={year.value} 
                        value={year.value}
                        className="hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white"
                      >
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Button 
                  className="bg-[#5f0889] hover:bg-[#5f0889]/90 text-white w-full"
                  onClick={handleFilter}
                >
                  Filtrar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6">
          {showFinancialData && (
            <div className="grid grid-cols-1 gap-4">
              <Card 
                className="relative p-4 border rounded-lg bg-white overflow-hidden cursor-pointer"
                onClick={() => setShowBalanceDialog(true)}
              >
                <div className="absolute inset-0">
                  <ParticlesBackground />
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start max-md:flex-col max-md:items-stretch">
                        <div className="text-gray-900 font-medium text-[15px] whitespace-nowrap">
                          Total de bônus recebido em {months.find(m => m.value === selectedMonth)?.label}/{selectedYear}
                        </div>
                        <div className="flex items-center gap-1 mt-2 md:mt-0 justify-end">
                          <span className="text-gray-500">R$</span>
                          <span className="text-gray-500">42.576,22</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1px] bg-gray-200 w-full"></div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-900 font-medium">Total de saldo</span>
                        <span className="text-red-500 font-medium">bloqueado</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-gray-500">R$</span>
                        <span className="text-gray-500">0,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="relative p-4 border border-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                  <ParticlesBackground />
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#02951e]" />
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[#02951e] font-medium">Saldo disponível</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#02951e]">R$</span>
                    <span className="text-[#02951e]">5.000,01</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
        <DialogContent className="relative overflow-hidden">
          <div className="absolute inset-0">
            <ParticlesBackground />
          </div>
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">
                Detalhes do Saldo
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total de bônus recebido:</span>
                <span className="text-gray-900 font-medium">R$ 42.576,22</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total de saldo bloqueado:</span>
                <span className="text-red-500 font-medium">R$ 0,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Saldo disponível:</span>
                <span className="text-[#02951e] font-medium">R$ 5.000,01</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
