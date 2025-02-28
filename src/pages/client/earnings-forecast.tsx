
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EarningsForecast() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("2");
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
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" }
  ];
  
  const bonusItems = [
    { type: "Binário", value: "R$ 0,00" },
    { type: "Bônus Adesão Cadastrador", value: "R$ 0,00" },
    { type: "Bônus Ativação", value: "R$ 0,00" },
    { type: "Bônus Cashback", value: "R$ 0,00" },
    { type: "Bônus Equipe Promocional", value: "R$ 0,00" },
    { type: "Bônus Indicação", value: "R$ 0,00" },
    { type: "Distribuição", value: "R$ 0,00" },
    { type: "Equipe", value: "R$ 0,00" },
    { type: "Liderança", value: "R$ 0,00" },
    { type: "Loja Externa", value: "R$ 0,00" },
    { type: "Participação", value: "R$ 0,00" },
    { type: "Recompra", value: "R$ 0,00" },
    { type: "Residual", value: "R$ 0,00" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#46005e] border-b border-white/10 z-50">
        <div className="h-full flex items-center px-6 relative z-10">
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400 font-normal leading-tight">RELATÓRIOS</h1>
            <h2 className="text-xl text-white font-medium leading-7">Bônus Totais - {months.find(m => m.value === selectedMonth)?.label} / {selectedYear}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-6 md:py-8 mt-16">
        <div className="border rounded-lg bg-white p-6 shadow-sm w-full md:w-[780px] mx-auto mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-[#5f0889]" />
            <span className="text-base font-medium text-[#5f0889]">Filtros</span>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Mês
              </label>
              <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger 
                  className="w-full bg-white text-gray-900 border-gray-300 h-12"
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
                  className="w-full bg-white text-gray-900 border-gray-300 h-12"
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
        
        {/* Alerta de previsão */}
        <div className="bg-white border border-yellow-400 border-l-[10px] rounded-md p-4 mb-6 w-full md:w-[780px] mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-amber-800">
                <span className="font-bold">Previsão de bônus.</span> O valor apresentado nesse relatório pode ser alterado durante o processamento do bônus.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabela de bônus */}
        <div className="bg-white border rounded-lg overflow-hidden w-full md:w-[780px] mx-auto mb-8">
          {bonusItems.map((item, index) => (
            <div key={index} className={`flex justify-between py-4 px-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="font-medium text-gray-700">{item.type}</div>
              <div className="text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
        
        {/* Total separado abaixo da tabela principal */}
        <div className="w-full md:w-[780px] mx-auto border-[8px] border-[#FFD700] rounded-lg overflow-hidden">
          <div className="flex justify-between py-4 px-8 bg-white">
            <div className="font-bold text-2xl text-[#8B6914]">Total de Bônus</div>
            <div className="font-bold text-2xl text-[#8B6914]">R$ 0,00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
