
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

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
    console.log("Filtering with:", { month: selectedMonth, year: selectedYear });
  };

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="max-w-[530px] mx-auto p-6 mt-[60px] relative z-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Financeiro</h1>
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Resumo</h2>

        <div className="mb-6 border rounded-lg">
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
                className="bg-[#5f0889] hover:bg-[#5f0889] text-white w-full"
                onClick={handleFilter}
              >
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card className="relative p-4 border rounded-lg bg-white overflow-hidden">
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
      </div>
    </div>
  );
}
