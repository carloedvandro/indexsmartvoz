
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FinancialHeader } from "@/components/client/financial/FinancialHeader";
import { FinancialFilter } from "@/components/client/financial/FinancialFilter";
import { FinancialSummary } from "@/components/client/financial/FinancialSummary";
import { FinancialTable } from "@/components/client/financial/FinancialTable";
import { ExportPDFButton } from "@/components/client/financial/ExportPDFButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { BalanceDialog } from "@/components/client/financial/BalanceDialog";
import { SearchBar } from "@/components/client/financial/SearchBar";
import { useFinancial } from "@/contexts/financial/FinancialContext";
import { useFinancialData } from "@/hooks/useFinancialData";
import { FinancialProvider } from "@/contexts/financial/FinancialContext";

export default function FinancialDetails() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);

  return (
    <FinancialProvider>
      <FinancialContent 
        navigate={navigate}
        isMobile={isMobile}
        balanceDialogOpen={balanceDialogOpen}
        setBalanceDialogOpen={setBalanceDialogOpen}
      />
    </FinancialProvider>
  );
}

function FinancialContent({ 
  navigate, 
  isMobile, 
  balanceDialogOpen, 
  setBalanceDialogOpen 
}: {
  navigate: (path: string) => void;
  isMobile: boolean;
  balanceDialogOpen: boolean;
  setBalanceDialogOpen: (open: boolean) => void;
}) {
  const { filterTransactions, handleCardClick } = useFinancialData();
  const { 
    selectedMonth, 
    selectedYear, 
    filteredTransactions,
    detailedViewTitle,
    selectedCardType
  } = useFinancial();

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

  return (
    <div className="min-h-screen bg-white">
      <FinancialHeader
        monthLabel={months.find(m => m.value === selectedMonth)?.label || "Fevereiro"}
        selectedYear={selectedYear}
      />

      <div className="max-w-[1080px] mx-auto px-4 py-6 md:px-6 md:py-8 mt-16">
        <FinancialFilter 
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
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
          <SearchBar />
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
