
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { FinancialHeader } from "@/components/client/financial/FinancialDetailsHeader";
import { FinancialFilter } from "@/components/client/financial/FinancialFilter";
import { FinancialSummary } from "@/components/client/financial/FinancialSummary";
import { FinancialTable } from "@/components/client/financial/FinancialTable";
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

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#46005e] border-b border-white/10 z-50">
        <ParticlesBackground style="default" />
        <FinancialHeader monthLabel={monthLabel} selectedYear={selectedYear} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-6 md:py-8 mt-16">
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

        <div className="flex flex-row justify-between items-center gap-3 w-full md:w-[780px] mx-auto mb-6">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border rounded-md px-4 h-9 w-full md:w-64"
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

        <div className="flex justify-between items-center mt-4 text-sm w-full md:w-[780px] mx-auto">
          <div className="text-gray-600">
            Total de {filteredTransactions.length} registros
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Saldo anterior: </span>
            <span>R$0,00</span>
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

interface ExportPDFButtonProps {
  filteredTransactions: any[];
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
}

function ExportPDFButton({ filteredTransactions, selectedMonth, selectedYear, months }: ExportPDFButtonProps) {
  const handleExportPDF = () => {
    const jsPDF = require('jspdf');
    const doc = new jsPDF({
      orientation: "landscape",
    });
    
    // Centraliza o título
    doc.setFontSize(16);
    const title = "Extrato Detalhado";
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.width;
    doc.text(title, (pageWidth - titleWidth) / 2, 20);
    
    // Centraliza o período
    doc.setFontSize(10);
    const period = `Período: ${months.find(m => m.value === selectedMonth)?.label} de ${selectedYear}`;
    const periodWidth = doc.getTextWidth(period);
    doc.text(period, (pageWidth - periodWidth) / 2, 30);
    
    // Define margens laterais para centralizar a tabela
    const margin = 40;
    const tableWidth = pageWidth - (margin * 2);
    
    // Define larguras proporcionais para cada coluna
    const colWidths = {
      date: Math.floor(tableWidth * 0.12),
      type: Math.floor(tableWidth * 0.22),
      description: Math.floor(tableWidth * 0.24),
      value: Math.floor(tableWidth * 0.20),
      balance: Math.floor(tableWidth * 0.22)
    };
    
    let y = 40;
    
    // Altura padrão para todas as linhas da tabela
    const rowHeight = 8;
    
    // Cabeçalho da tabela com altura e cor padrão
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 6, tableWidth, rowHeight, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    
    // Centraliza verticalmente o texto do cabeçalho
    const headerTextY = y - 1;
    
    // Definindo pontos de início de cada coluna
    const dateStartX = margin;
    const typeStartX = dateStartX + colWidths.date;
    const descriptionStartX = typeStartX + colWidths.type;
    const valueStartX = descriptionStartX + colWidths.description;
    const balanceStartX = valueStartX + colWidths.value;
    
    // Definindo pontos finais de cada coluna
    const valueEndX = balanceStartX;
    const balanceEndX = balanceStartX + colWidths.balance;
    
    // Cabeçalhos
    doc.text("Data", dateStartX + 5, headerTextY);
    doc.text("Histórico", typeStartX + 5, headerTextY);
    doc.text("Descrição", descriptionStartX + 5, headerTextY);
    doc.text("Valor", valueEndX - 5, headerTextY, { align: "right" });
    doc.text("Saldo", balanceEndX - 5, headerTextY, { align: "right" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    
    // Adiciona linhas da tabela com a mesma altura
    y += rowHeight + 2;
    
    filteredTransactions.forEach((transaction, index) => {
      // Adiciona fundo alternado com altura padronizada
      if (index % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(margin, y - 6, tableWidth, rowHeight, 'F');
      }
      
      // Centraliza verticalmente o texto na linha
      const textY = y - 1;
      
      // Coluna Data
      doc.setTextColor(0, 0, 0);
      doc.text(transaction.date, dateStartX + 5, textY);
      
      // Coluna Histórico
      doc.text(transaction.type, typeStartX + 5, textY);
      
      // Coluna Descrição
      doc.text(transaction.description, descriptionStartX + 5, textY);
      
      // Coluna Valor (verde e alinhado à direita)
      doc.setTextColor(34, 197, 94);
      doc.text(transaction.value, valueEndX - 5, textY, { align: "right" });
      
      // Coluna Saldo (preto e alinhado à direita)
      doc.setTextColor(0, 0, 0);
      doc.text(transaction.balance, balanceEndX - 5, textY, { align: "right" });
      
      y += rowHeight + 2;
    });
    
    // Adiciona o total de registros na parte inferior
    y += 6;
    doc.setFontSize(10);
    doc.text(`Total de registros: ${filteredTransactions.length}`, margin, y);
    
    doc.save(`extrato-${selectedMonth}-${selectedYear}.pdf`);
  };

  return (
    <button 
      onClick={handleExportPDF}
      className="bg-[#5f0889] text-white px-6 h-9 rounded-md hover:bg-[#5f0889]/90 transition-colors whitespace-nowrap"
    >
      Baixar em PDF
    </button>
  );
}
