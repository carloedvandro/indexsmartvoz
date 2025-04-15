
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FinancialHeader } from "@/components/client/financial/FinancialDetailsHeader";
import { FinancialFilter } from "@/components/client/financial/FinancialFilter";
import { FinancialSummary } from "@/components/client/financial/FinancialSummary";
import { FinancialTable } from "@/components/client/financial/FinancialTable";
import { ExportPDFButton } from "@/components/client/financial/ExportPDFButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { BalanceDialog } from "@/components/client/financial/BalanceDialog";
import { Transaction } from "@/components/client/financial/types";
import { useToast } from "@/hooks/use-toast";

export default function FinancialDetails() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { toast } = useToast();
  const { type } = location.state || {};

  const transactions = [
    { date: '10/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 4.059,05', balance: 'R$ 10.848,84' },
    { date: '11/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 10,00', balance: 'R$ 10.858,84' },
    { date: '13/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 9.012,98', balance: 'R$ 24.738,96' },
    { date: '15/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 24.938,33' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.495,92', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.589,96', balance: 'R$ 38.024,21' },
    { date: '23/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 47.129,34' },
  ];

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

        {selectedCardType && (
          <div className="w-full md:w-[680px] mx-auto mb-4">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">{detailedViewTitle}</h2>
          </div>
        )}

        <div className="flex flex-row justify-between items-center gap-3 w-full md:w-[680px] mx-auto mb-6">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border rounded-md px-4 h-9 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <ExportPDFButton 
            filteredTransactions={filteredTransactions}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            months={months}
          />
        </div>

        <FinancialTable 
          filteredTransactions={filteredTransactions}
          isMobile={isMobile}
        />

        <div className="flex justify-between items-center mt-4 px-2 text-sm w-full md:w-[680px] mx-auto">
          <div className="text-gray-600">
            Total de {filteredTransactions.length} registros
          </div>
          <div className="text-gray-700">
            Saldo anterior: <span className="font-medium">R$0,00</span>
          </div>
        </div>
      </div>
      
      <BalanceDialog
        open={balanceDialogOpen}
        onOpenChange={setBalanceDialogOpen}
      />
    </div>
  );
}
