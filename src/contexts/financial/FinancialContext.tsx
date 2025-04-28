
import { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction } from '@/components/client/financial/types';

interface FinancialContextData {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCardType: string | null;
  setSelectedCardType: (type: string | null) => void;
  detailedViewTitle: string;
  setDetailedViewTitle: (title: string) => void;
  filteredTransactions: Transaction[];
  setFilteredTransactions: (transactions: Transaction[]) => void;
}

const FinancialContext = createContext<FinancialContextData | undefined>(undefined);

export function FinancialProvider({ children }: { children: ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState("2");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const [detailedViewTitle, setDetailedViewTitle] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  return (
    <FinancialContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        searchTerm,
        setSearchTerm,
        selectedCardType,
        setSelectedCardType,
        detailedViewTitle,
        setDetailedViewTitle,
        filteredTransactions,
        setFilteredTransactions,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}
