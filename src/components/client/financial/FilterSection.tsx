
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

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
    <div className="border rounded-lg bg-white">
      <div className="py-2 px-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#5f0889]" />
          <span className="text-sm font-medium text-gray-900">Filtros</span>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-6 gap-4 mb-6">
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
        </div>
        <div className="flex justify-between gap-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <ParticlesBackground />
            </div>
            <div className="relative z-10">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-[120px] border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white"
              >
                Voltar
              </Button>
            </div>
          </div>
          <Button 
            onClick={onFilter}
            className="w-[120px] bg-[#5f0889] hover:bg-[#5f0889]/90 text-white"
          >
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}
