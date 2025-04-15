
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Database, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function InventoryReports() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [selectedYear, setSelectedYear] = useState("2025");
  
  const handleBack = () => {
    navigate('/client/dashboard');
  };
  
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
  
  const inventoryItems = [
    { type: "SIM Cards", total: 250, available: 180, allocated: 70 },
    { type: "eSIMs", total: 500, available: 420, allocated: 80 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#46005e] border-b border-white/10 z-50">
        <div className="h-full flex items-center px-6 relative z-10">
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400 font-normal leading-tight">Relatório</h1>
            <h2 className="text-xl text-white font-medium leading-7">Estoque - {months.find(m => m.value === selectedMonth)?.label} / {selectedYear}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-6 md:py-8 mt-16">
        <div className="border rounded-lg bg-white p-6 shadow-sm w-full md:w-[780px] mx-auto mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-[#5f0889]" />
            <span className="text-base font-medium text-[#5f0889]">Filtros</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Mês
              </label>
              <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger 
                  className="w-full max-w-[200px] bg-white text-gray-900 border-gray-300 h-12"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border border-gray-200 rounded-md shadow-md">
                  {months.map((month) => (
                    <SelectItem 
                      key={month.value} 
                      value={month.value}
                      className="hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white py-2 px-2"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ano
              </label>
              <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger 
                  className="w-full max-w-[200px] bg-white text-gray-900 border-gray-300 h-12"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border border-gray-200 rounded-md shadow-md">
                  {years.map((year) => (
                    <SelectItem 
                      key={year.value} 
                      value={year.value}
                      className="hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white py-2 px-2"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between w-full">
            <button 
              onClick={handleBack}
              className="border border-[#5f0889] text-[#5f0889] h-10 rounded-md hover:bg-[#5f0889] hover:text-white transition-colors w-full sm:w-auto px-4 sm:px-10"
            >
              Voltar
            </button>
            
            <button 
              className="bg-[#5f0889] text-white h-10 rounded-md hover:bg-[#5f0889]/90 transition-colors w-full sm:w-auto px-4 sm:px-10"
            >
              Filtrar
            </button>
          </div>
        </div>
        
        {/* Tabela de Estoque */}
        <div className="bg-white border rounded-lg overflow-hidden w-full md:w-[780px] mx-auto mb-4">
          <div className="flex items-center gap-3 p-4 bg-[#5f0889]/10 border-b border-gray-200">
            <Database className="w-5 h-5 text-[#5f0889]" />
            <h3 className="font-medium text-[#5f0889]">Resumo do Estoque</h3>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 grid grid-cols-4 text-sm font-medium text-gray-600">
            <div>Item</div>
            <div className="text-center">Total</div>
            <div className="text-center">Disponível</div>
            <div className="text-center">Alocado</div>
          </div>
          
          {inventoryItems.map((item, index) => (
            <div 
              key={index} 
              className={`px-4 py-3 grid grid-cols-4 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">{item.type}</span>
              </div>
              <div className="text-center text-gray-900">{item.total}</div>
              <div className="text-center text-green-600">{item.available}</div>
              <div className="text-center text-amber-600">{item.allocated}</div>
            </div>
          ))}
        </div>
        
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-[780px] mx-auto">
          <Card className="p-4 border border-l-[10px] border-l-purple-600">
            <p className="text-sm text-gray-500">Total em Estoque</p>
            <p className="text-2xl font-semibold text-gray-900">750</p>
          </Card>
          
          <Card className="p-4 border border-l-[10px] border-l-green-600">
            <p className="text-sm text-gray-500">Disponíveis</p>
            <p className="text-2xl font-semibold text-green-600">600</p>
          </Card>
          
          <Card className="p-4 border border-l-[10px] border-l-amber-600">
            <p className="text-sm text-gray-500">Alocados</p>
            <p className="text-2xl font-semibold text-amber-600">150</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
