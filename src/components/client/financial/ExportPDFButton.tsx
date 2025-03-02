
import React from 'react';
import { Transaction, Month } from './types';
import jspdf from 'jspdf';

interface ExportPDFButtonProps {
  filteredTransactions: Transaction[];
  selectedMonth: string;
  selectedYear: string;
  months: Month[];
}

export function ExportPDFButton({ 
  filteredTransactions, 
  selectedMonth, 
  selectedYear, 
  months 
}: ExportPDFButtonProps) {
  const handleExportPDF = () => {
    try {
      // Create a new jsPDF instance
      const doc = new jspdf({
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
      
      // Save the PDF with a specific name
      doc.save(`extrato-${selectedMonth}-${selectedYear}.pdf`);
      
      console.log("PDF gerado com sucesso");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  return (
    <button 
      onClick={handleExportPDF}
      className="bg-[#5f0889] text-white px-6 py-2 rounded-md hover:bg-[#5f0889]/90 transition-colors whitespace-nowrap font-medium"
      style={{ background: "#5f0889", color: "white" }}
    >
      Baixar em PDF
    </button>
  );
}
