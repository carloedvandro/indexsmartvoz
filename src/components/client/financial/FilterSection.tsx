
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
    <div className="border rounded-lg bg-white relative z-[200]">
      <div className="flex items-center gap-2 p-4">
        <Filter className="w-4 h-4 text-[#5f0889]" />
        <span className="text-sm font-medium text-gray-900">Filtros</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-6 gap-4 mb-6">
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-900 mb-1">Mês</label>
            <Select defaultValue={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="w-full bg-white text-gray-900 border-gray-300">
                <SelectValue className="bg-white" />
              </SelectTrigger>
              <SelectContent
                className="!bg-white !z-[1000]"
              >
                {months.map((month) => (
                  <SelectItem 
                    key={month.value} 
                    value={month.value}
                    className="!bg-white hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-900 mb-1">Ano</label>
            <Select defaultValue={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-full bg-white text-gray-900 border-gray-300">
                <SelectValue className="bg-white" />
              </SelectTrigger>
              <SelectContent
                className="!bg-white !z-[1000]"
              >
                {years.map((year) => (
                  <SelectItem 
                    key={year.value} 
                    value={year.value}
                    className="!bg-white hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white"
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
            className="w-[80px] border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white"
          >
            Voltar
          </Button>
          <Button 
            onClick={onFilter}
            className="w-[80px] bg-[#5f0889] hover:bg-[#5f0889]/90 text-white"
          >
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}
