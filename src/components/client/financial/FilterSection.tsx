
import { Filter } from "lucide-react";
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
    <div className="border rounded-lg bg-white p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-[#5f0889]" />
        <span className="text-base font-medium">Filtros</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Mês
          </label>
          <Select defaultValue={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger 
              className="w-full bg-white text-gray-900 border-gray-300"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 rounded-md shadow-md">
              {months.map((month) => (
                <SelectItem 
                  key={month.value} 
                  value={month.value}
                  className="hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white"
                >
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Ano
          </label>
          <Select defaultValue={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger 
              className="w-full bg-white text-gray-900 border-gray-300"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 rounded-md shadow-md">
              {years.map((year) => (
                <SelectItem 
                  key={year.value} 
                  value={year.value}
                  className="hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white"
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
          className="min-w-[100px] border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white"
        >
          Voltar
        </Button>
        <Button 
          onClick={onFilter}
          className="min-w-[100px] bg-[#5f0889] hover:bg-[#5f0889]/90 text-white"
        >
          Filtrar
        </Button>
      </div>
    </div>
  );
}
