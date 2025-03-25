
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { FilterSection } from "@/components/client/financial/FilterSection";

export default function EarningsForecast() {
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
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" }
  ];
  
  const bonusItems = [
    { type: "Bônus Ativação", value: "R$ 0,00" },
    { type: "Bônus Equipe Promocional", value: "R$ 0,00" },
    { type: "Bônus Indicação", value: "R$ 0,00" },
    { type: "Equipe", value: "R$ 0,00" },
  ];

  const handleFilter = () => {
    console.log(`Filter applied: ${selectedMonth}/${selectedYear}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#660099] border-b border-white/10 z-40">
        <div className="h-full flex items-center px-6 relative z-10">
          <div className="flex flex-col max-w-xs truncate">
            <h1 className="text-sm text-gray-400 font-normal leading-tight">Relatório</h1>
            <h2 className="text-base text-white font-medium leading-6 truncate">Bônus Totais - {months.find(m => m.value === selectedMonth)?.label} / {selectedYear}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto px-4 py-6 md:px-6 md:py-8 mt-16">
        <div className="w-full mx-auto mb-6">
          <FilterSection 
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            months={months}
            years={years}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            onFilter={handleFilter}
          />
        </div>
        
        <div className="bg-white border border-yellow-400 border-l-[10px] rounded-md p-4 mb-6 w-full mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-amber-800">
                <span className="font-bold">Previsão de bônus.</span> O valor apresentado nesse relatório pode ser alterado durante o processamento do bônus.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg overflow-hidden w-full mx-auto mb-8">
          {bonusItems.map((item, index) => (
            <div key={index} className={`flex justify-between py-4 px-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="font-medium text-gray-700">{item.type}</div>
              <div className="text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
        
        <div className="w-full mx-auto border border-yellow-400 border-l-[10px] rounded-md overflow-hidden">
          <div className="flex justify-between py-4 px-8 bg-white">
            <div className="font-bold text-lg text-amber-800">Total de Bônus</div>
            <div className="font-bold text-lg text-amber-800">R$ 0,00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
