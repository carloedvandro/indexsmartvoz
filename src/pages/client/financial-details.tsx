
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FinancialHeader } from "@/components/client/financial/FinancialDetailsHeader";
import { FinancialFilter } from "@/components/client/financial/FinancialFilter";
import { FinancialSummary } from "@/components/client/financial/FinancialSummary";
import { FinancialTable } from "@/components/client/financial/FinancialTable";
import { DetailedViewTitle } from "@/components/client/financial/DetailedViewTitle";
import { SearchAndExportBar } from "@/components/client/financial/SearchAndExportBar";
import { TotalRecords } from "@/components/client/financial/TotalRecords";
import { BalanceDialog } from "@/components/client/financial/BalanceDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useTransactions } from "@/hooks/useTransactions";

export default function FinancialDetails() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { toast } = useToast();
  const { type } = location.state || {};
  const { transactions, months, years } = useTransactions();

  const [selectedMonth, setSelectedMonth] = useState("2");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const [detailedViewTitle, setDetailedViewTitle] = useState("");

  const filterTransactions = () => {
    let filtered = transactions.filter(transaction => {
      const [transactionDay, transactionMonth, transactionYear] = transaction.date.split('/').map(Number);
      const matchesMonthYear = transactionMonth === parseInt(selectedMonth) && transactionYear === parseInt(selectedYear);
      
      const matchesSearch = searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.value.includes(searchTerm) ||
        transaction.date.includes(searchTerm);
      
      // Base filtering by month/year and search term
      let shouldInclude = matchesMonthYear && (searchTerm === "" || matchesSearch);
      
      // Additional filtering based on selected card type
      if (selectedCardType) {
        if (selectedCardType === 'bonus' || selectedCardType === 'earnings') {
          shouldInclude = shouldInclude && transaction.type.toLowerCase().includes('bônus');
        }
        // For 'balance' and 'available', we show all transactions as they all affect the balance
      }
      
      return shouldInclude;
    });
    
    setFilteredTransactions(filtered);
  };

  const handleBack = () => {
    navigate('/client/dashboard');
  };

  const handleCardClick = (cardType: string) => {
    setSelectedCardType(cardType);
    
    // Set the detailed view title based on the selected card
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
    
    // Filter transactions based on the selected card
    filterTransactions();
    
    // Show a toast notification
    toast({
      title: "Extratos detalhados",
      description: `Mostrando os extratos para ${cardType === 'earnings' ? 'ganhos' : 
                   cardType === 'balance' ? 'saldo' : 
                   cardType === 'available' ? 'saldo disponível' : 
                   'bônus'} em ${monthLabel}/${selectedYear}`,
    });
  };

  useEffect(() => {
    filterTransactions();
  }, [selectedMonth, selectedYear, searchTerm, selectedCardType]);

  const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Fevereiro";

  return (
    <div className="min-h-screen bg-white">
      <FinancialHeader
        monthLabel={monthLabel}
        selectedYear={selectedYear}
      />

      <div className="max-w-[1080px] mx-auto px-4 py-6 md:px-6 md:py-8 mt-16">
        <FinancialFilter 
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          months={months}
          years={years}
          handleBack={handleBack}
          filterTransactions={filterTransactions}
        />

        <FinancialSummary 
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          months={months}
          onCardClick={handleCardClick}
        />

        {selectedCardType && <DetailedViewTitle title={detailedViewTitle} />}

        <SearchAndExportBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredTransactions={filteredTransactions}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          months={months}
        />

        <FinancialTable 
          filteredTransactions={filteredTransactions}
          isMobile={isMobile}
        />

        <TotalRecords count={filteredTransactions.length} />
      </div>
      
      <BalanceDialog
        open={balanceDialogOpen}
        onOpenChange={setBalanceDialogOpen}
      />
    </div>
  );
}
