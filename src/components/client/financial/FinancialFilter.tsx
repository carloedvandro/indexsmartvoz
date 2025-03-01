
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="mb-6 md:mb-8 w-full md:w-[780px] mx-auto">
      <div className="border rounded-lg bg-white p-6 shadow-sm w-full">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-[#5f0889]" />
          <span className="text-sm font-medium text-gray-900">Filtros</span>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div className="w-full md:max-w-[200px]">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Mês
            </label>
            <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger 
                className="w-full !bg-white text-gray-900 border-gray-300"
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

          <div className="w-full md:max-w-[200px]">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Ano
            </label>
            <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger 
                className="w-full !bg-white text-gray-900 border-gray-300"
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

        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={handleBack}
            className="border border-[#5f0889] text-[#5f0889] h-9 rounded-md hover:bg-[#5f0889] hover:text-white transition-colors w-[80px]"
          >
            Voltar
          </button>
          <button 
            onClick={filterTransactions}
            className="bg-[#5f0889] text-white h-9 rounded-md hover:bg-[#5f0889]/90 transition-colors w-[80px]"
          >
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
}
