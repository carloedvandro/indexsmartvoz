
import React from 'react';
import { SearchBar } from './SearchBar';
import { ExportPDFButton } from './ExportPDFButton';
import { Transaction, Month } from './types';

interface SearchAndExportBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredTransactions: Transaction[];
  selectedMonth: string;
  selectedYear: string;
  months: Month[];
}

export function SearchAndExportBar({ 
  searchTerm, 
  setSearchTerm, 
  filteredTransactions, 
  selectedMonth, 
  selectedYear, 
  months 
}: SearchAndExportBarProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-3 w-full md:w-[680px] mx-auto mb-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExportPDFButton 
        filteredTransactions={filteredTransactions}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        months={months}
      />
    </div>
  );
}
