
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
    <div className="border rounded-lg bg-white">
      <div className="py-3 px-4 border-b bg-[#f3f3f3]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Filtros</span>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <label className="block text-sm text-gray-600 mb-1">Mês</label>
            <Select defaultValue={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="w-full bg-white border border-gray-200 text-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem 
                    key={month.value} 
                    value={month.value}
                    className="hover:bg-[#0FA0CE] hover:text-white focus:bg-[#0FA0CE] focus:text-white"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3">
            <label className="block text-sm text-gray-600 mb-1">Ano</label>
            <Select defaultValue={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-full bg-white border border-gray-200 text-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem 
                    key={year.value} 
                    value={year.value}
                    className="hover:bg-[#0FA0CE] hover:text-white focus:bg-[#0FA0CE] focus:text-white"
                  >
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={onFilter}
            className="w-[120px] bg-[#0FA0CE] hover:bg-[#0FA0CE]/90 text-white"
          >
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}
