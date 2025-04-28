
import { useState, useEffect } from "react";
import { Transaction } from "@/components/client/financial/types";

export function useFinancialData() {
  const [selectedMonth, setSelectedMonth] = useState("2");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const [detailedViewTitle, setDetailedViewTitle] = useState("");
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);

  const transactions = [
    { date: '10/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 4.059,05', balance: 'R$ 10.848,84' },
    { date: '11/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 10,00', balance: 'R$ 10.858,84' },
    { date: '13/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 9.012,98', balance: 'R$ 24.738,96' },
    { date: '15/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 24.938,33' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.495,92', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.589,96', balance: 'R$ 38.024,21' },
    { date: '23/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 47.129,34' },
  ];

  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const months = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" }
  ];

  const years = [
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" }
  ];

  const filterTransactions = () => {
    let filtered = transactions.filter(transaction => {
      const [transactionDay, transactionMonth, transactionYear] = transaction.date.split('/').map(Number);
      const matchesMonthYear = transactionMonth === parseInt(selectedMonth) && transactionYear === parseInt(selectedYear);
      
      const matchesSearch = searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.value.includes(searchTerm) ||
        transaction.date.includes(searchTerm);
      
      let shouldInclude = matchesMonthYear && (searchTerm === "" || matchesSearch);
      
      if (selectedCardType) {
        if (selectedCardType === 'bonus' || selectedCardType === 'earnings') {
          shouldInclude = shouldInclude && transaction.type.toLowerCase().includes('bônus');
        }
      }
      
      return shouldInclude;
    });
    
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    filterTransactions();
  }, [selectedMonth, selectedYear, searchTerm, selectedCardType]);

  return {
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
    balanceDialogOpen,
    setBalanceDialogOpen,
    filteredTransactions,
    filterTransactions,
    months,
    years,
  };
}
