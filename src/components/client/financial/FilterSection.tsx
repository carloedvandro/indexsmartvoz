
import { FilterIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterSectionProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  years: Array<{ value: string; label: string }>;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onFilter: () => void;
}

export function FilterSection({
  selectedMonth,
  selectedYear,
  months,
  years,
  onMonthChange,
  onYearChange,
  onFilter
}: FilterSectionProps) {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon className="w-5 h-5 text-[#5f0889]" />
        <span className="text-base font-medium">Filtros</span>
      </div>
      
      <div className="flex justify-between mb-6">
        <div className="w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mês
          </label>
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger 
              className="w-full bg-white text-gray-800 border-gray-300 rounded-md"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md z-50">
              {months.map((month) => (
                <SelectItem 
                  key={month.value} 
                  value={month.value}
                  className="cursor-pointer py-1.5 px-2 bg-white hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white selected:bg-[#5f0889] selected:text-white"
                >
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano
          </label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger 
              className="w-full bg-white text-gray-800 border-gray-300 rounded-md"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md z-50">
              {years.map((year) => (
                <SelectItem 
                  key={year.value} 
                  value={year.value}
                  className="cursor-pointer py-1.5 px-2 bg-white hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white selected:bg-[#5f0889] selected:text-white"
                >
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="min-w-[80px] h-9 px-3 py-1 border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white rounded-md text-sm"
        >
          Voltar
        </Button>
        <Button 
          onClick={onFilter}
          className="min-w-[80px] h-9 px-3 py-1 bg-[#5f0889] hover:bg-[#5f0889]/90 text-white rounded-md text-sm"
        >
          Filtrar
        </Button>
      </div>
    </>
  );
}
