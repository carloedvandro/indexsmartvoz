
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface FinancialFilterProps {
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  months: Array<{ value: string; label: string }>;
  years: Array<{ value: string; label: string }>;
  handleBack: () => void;
  filterTransactions: () => void;
}

export function FinancialFilter({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  months,
  years,
  handleBack,
  filterTransactions,
}: FinancialFilterProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6 md:mb-8 w-full md:w-[540px] mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-[#5f0889]" />
        <span className="text-sm font-medium text-gray-900">Filtros</span>
      </div>
      <div className="flex flex-row justify-between gap-4 mb-6">
        <div className="w-full md:w-[200px]">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Mês
          </label>
          <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger 
              className="w-full !bg-white text-gray-900 border-gray-300 h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 rounded-md shadow-md">
              {months.map((month) => (
                <SelectItem 
                  key={month.value} 
                  value={month.value}
                  className="cursor-pointer py-1.5 px-2 !bg-white hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white selected:!bg-[#5f0889] selected:!text-white"
                >
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-[200px]">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Ano
          </label>
          <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger 
              className="w-full !bg-white text-gray-900 border-gray-300 h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 rounded-md shadow-md">
              {years.map((year) => (
                <SelectItem 
                  key={year.value} 
                  value={year.value}
                  className="cursor-pointer py-1.5 px-2 !bg-white hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white selected:!bg-[#5f0889] selected:!text-white"
                >
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <button 
          onClick={handleBack}
          className="border border-[#5f0889] text-[#5f0889] h-9 rounded-md hover:bg-[#5f0889] hover:text-white transition-colors w-full"
        >
          Voltar
        </button>
        <button 
          onClick={filterTransactions}
          className="bg-[#5f0889] text-white h-9 rounded-md hover:bg-[#5f0889]/90 transition-colors w-full"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
