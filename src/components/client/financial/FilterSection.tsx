
import { FilterIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon className="w-5 h-5 text-[#5f0889]" />
        <span className="text-base font-medium">Filtros</span>
      </div>
      
      <div className="flex flex-row justify-between gap-4 mb-6">
        <div className="w-full md:w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mês
          </label>
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger 
              className="w-full bg-white text-gray-800 border-gray-300 rounded-md h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md z-50">
              {months.map((month) => (
                <SelectItem 
                  key={month.value} 
                  value={month.value}
                  className="cursor-pointer py-1.5 px-2 bg-white hover:bg-white focus:bg-white focus:text-[#5f0889] data-[state=checked]:bg-white data-[state=checked]:text-[#5f0889]"
                >
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano
          </label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger 
              className="w-full bg-white text-gray-800 border-gray-300 rounded-md h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md z-50">
              {years.map((year) => (
                <SelectItem 
                  key={year.value} 
                  value={year.value}
                  className="cursor-pointer py-1.5 px-2 bg-white hover:bg-white focus:bg-white focus:text-[#5f0889] data-[state=checked]:bg-white data-[state=checked]:text-[#5f0889]"
                >
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="h-9 px-3 py-1 border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white rounded-md text-sm w-full"
        >
          Voltar
        </Button>
        <Button 
          onClick={onFilter}
          className="h-9 px-3 py-1 bg-[#5f0889] hover:bg-[#5f0889]/90 text-white rounded-md text-sm w-full"
        >
          Filtrar
        </Button>
      </div>
    </>
  );
}
