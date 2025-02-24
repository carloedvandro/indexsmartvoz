
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
  return (
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
            <Select defaultValue={selectedMonth} onValueChange={onMonthChange}>
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
            <Select defaultValue={selectedYear} onValueChange={onYearChange}>
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
              onClick={onFilter}
            >
              Filtrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
