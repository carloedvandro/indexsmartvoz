
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFinancial } from '@/contexts/financial/FinancialContext';
import { Transaction } from '@/components/client/financial/types';

export function useFinancialData() {
  const { toast } = useToast();
  const {
    selectedMonth,
    selectedYear,
    searchTerm,
    selectedCardType,
    setDetailedViewTitle,
    setFilteredTransactions
  } = useFinancial();

  const transactions = [
    { date: '10/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 4.059,05', balance: 'R$ 10.848,84' },
    { date: '11/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 10,00', balance: 'R$ 10.858,84' },
    { date: '13/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 9.012,98', balance: 'R$ 24.738,96' },
    { date: '15/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 24.938,33' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.495,92', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.589,96', balance: 'R$ 38.024,21' },
    { date: '23/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 47.129,34' },
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

  const handleCardClick = (cardType: string) => {
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

    const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Fevereiro";
    
    switch(cardType) {
      case 'earnings':
        setDetailedViewTitle(`Total de ganhos em ${monthLabel}/${selectedYear}`);
        break;
      case 'balance':
        setDetailedViewTitle(`Saldo em ${monthLabel}/${selectedYear}`);
        break;
      case 'available':
        setDetailedViewTitle(`Saldo disponível em ${monthLabel}/${selectedYear}`);
        break;
      case 'bonus':
        setDetailedViewTitle(`Total de bônus recebido em ${monthLabel}/${selectedYear}`);
        break;
      default:
        setDetailedViewTitle(`Extratos em ${monthLabel}/${selectedYear}`);
    }
    
    filterTransactions();
    
    toast({
      title: "Extratos detalhados",
      description: `Mostrando os extratos para ${cardType === 'earnings' ? 'ganhos' : 
                   cardType === 'balance' ? 'saldo' : 
                   cardType === 'available' ? 'saldo disponível' : 
                   'bônus'} em ${monthLabel}/${selectedYear}`,
    });
  };

  return {
    filterTransactions,
    handleCardClick
  };
}
