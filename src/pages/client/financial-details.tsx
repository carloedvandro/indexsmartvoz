
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FinancialHeader } from "@/components/client/financial/FinancialDetailsHeader";
import { FinancialFilter } from "@/components/client/financial/FinancialFilter";
import { FinancialSummary } from "@/components/client/financial/FinancialSummary";
import { FinancialTable } from "@/components/client/financial/FinancialTable";
import { ExportPDFButton } from "@/components/client/financial/ExportPDFButton";
import { SearchBar } from "@/components/client/financial/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { BalanceDialog } from "@/components/client/financial/BalanceDialog";
import { useToast } from "@/hooks/use-toast";
import { useFinancialData } from "@/hooks/useFinancialData";

export default function FinancialDetails() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { toast } = useToast();
  const { type } = location.state || {};

  const {
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
    months,
    years,
  } = useFinancialData();

  const handleBack = () => {
    navigate('/client/dashboard');
  };

  const handleCardClick = (cardType: string) => {
    setSelectedCardType(cardType);
    
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
    
    toast({
      title: "Extratos detalhados",
      description: `Mostrando os extratos para ${cardType === 'earnings' ? 'ganhos' : 
                   cardType === 'balance' ? 'saldo' : 
                   cardType === 'available' ? 'saldo disponível' : 
                   'bônus'} em ${monthLabel}/${selectedYear}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <FinancialHeader
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        months={months}
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
          filterTransactions={() => {}}
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
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredTransactionsCount={filteredTransactions.length}
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
      </div>
      
      <BalanceDialog
        open={balanceDialogOpen}
        onOpenChange={setBalanceDialogOpen}
      />
    </div>
  );
}
