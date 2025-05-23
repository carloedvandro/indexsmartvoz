
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FinancialHeader } from "@/components/client/financial/FinancialHeader";
import { FilterSection } from "@/components/client/financial/FilterSection";
import { BalanceCards } from "@/components/client/financial/BalanceCards";
import { BalanceDialog } from "@/components/client/financial/BalanceDialog";
import { BillingStatusCards } from "@/components/client/financial/BillingStatusCards";

export default function Financial() {
  const location = useLocation();
  const [selectedMonth, setSelectedMonth] = useState("5");
  const [selectedYear, setSelectedYear] = useState("2018");
  const [showFinancialData, setShowFinancialData] = useState(false);
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);

  // Mostrar os dados financeiros automaticamente se vier do dashboard
  useEffect(() => {
    if (location.state?.showFinancialData) {
      setShowFinancialData(true);
    }
  }, [location.state]);

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
    { value: "2025", label: "2025" }
  ];

  const handleFilter = () => {
    setShowFinancialData(true);
    console.log("Filtering with:", { month: selectedMonth, year: selectedYear });
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white">
      <FinancialHeader 
        selectedMonth={selectedMonth} 
        selectedYear={selectedYear}
        months={months}
      />

      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-[800px] mx-auto h-full flex flex-col">
          <div className="mt-[116px] px-4 sm:px-6">
            <FilterSection
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              months={months}
              years={years}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
              onFilter={handleFilter}
            />
          </div>

          <div className="px-4 sm:px-6 mt-3">
            {showFinancialData && (
              <>
                <BalanceCards
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  months={months}
                  onCardClick={() => setShowBalanceDialog(true)}
                />
                
                <div className="mt-8">
                  <BillingStatusCards />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <BalanceDialog
        open={showBalanceDialog}
        onOpenChange={setShowBalanceDialog}
      />
    </div>
  );
}
