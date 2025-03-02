
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { FinancialHeader } from "@/components/client/financial/FinancialDetailsHeader";
import { FinancialFilter } from "@/components/client/financial/FinancialFilter";
import { FinancialSummary } from "@/components/client/financial/FinancialSummary";
import { FinancialTable } from "@/components/client/financial/FinancialTable";
import { ExportPDFButton } from "@/components/client/financial/ExportPDFButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { BalanceDialog } from "@/components/client/financial/BalanceDialog";

export default function FinancialDetails() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
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

  const filterTransactions = () => {
    const filtered = transactions.filter(transaction => {
      const matchesSearch = searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.value.includes(searchTerm) ||
        transaction.date.includes(searchTerm);
      
      const [month, year] = transaction.date.split('/').map(Number);
      const matchesFilter = month === parseInt(selectedMonth) && year === parseInt(selectedYear);
      
      return matchesFilter && (searchTerm === "" || matchesSearch);
    });
    
    setFilteredTransactions(filtered);
  };

  const handleBack = () => {
    navigate('/client/dashboard');
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

  const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Fevereiro";

  useEffect(() => {
    filterTransactions();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#46005e] border-b border-white/10 z-50">
        <ParticlesBackground style="default" />
        <div className="h-full flex items-center px-6 relative z-10">
          <div className="flex flex-col max-w-xs truncate">
            <h1 className="text-sm text-gray-400 font-normal leading-tight">Financeiro</h1>
            <h2 className="text-lg text-white font-medium leading-6 truncate">Extrato Detalhado - {monthLabel} / {selectedYear}</h2>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 py-6 md:px-0 md:py-8 mt-16 flex flex-col items-center">
        <div className="w-full max-w-[800px]">
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
            onCardClick={() => setBalanceDialogOpen(true)}
          />

          <div className="flex flex-row justify-between items-center gap-3 w-full mb-6">
            <input
              type="text"
              placeholder="Pesquisar"
              className="border rounded-md px-4 h-9 w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filterTransactions();
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

          <div className="flex justify-between items-center mt-4 text-sm w-full">
            <div className="text-gray-600">
              Total de {filteredTransactions.length} registros
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">Saldo anterior: </span>
              <span>R$0,00</span>
            </div>
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
