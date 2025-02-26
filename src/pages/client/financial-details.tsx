import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FinancialHeader } from "@/components/client/financial/FinancialHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterX } from "lucide-react";
import jsPDF from "jspdf";

export default function FinancialDetails() {
  const location = useLocation();
  const { type } = location.state || {};

  const transactions = [
    { date: '10/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 4.059,05', balance: 'R$ 10.848,84' },
    { date: '11/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 10,00', balance: 'R$ 10.858,84' },
    { date: '13/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 9.012,98', balance: 'R$ 24.738,96' },
    { date: '15/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 24.938,33' },
    { date: '16/02/2025', type: 'Imposto de renda', description: 'Lançamento financeiro', value: 'R$ 0,00', balance: 'R$ 24.938,33' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.495,92', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'Inss', description: 'Lançamento financeiro', value: 'R$ 0,00', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'Bônus de equipe', description: 'Lançamento financeiro', value: 'R$ 6.589,96', balance: 'R$ 38.024,21' },
    { date: '23/02/2025', type: 'Bônus de indicação', description: 'Lançamento financeiro', value: 'R$ 30,00', balance: 'R$ 47.129,34' },
  ];

  const [selectedMonth, setSelectedMonth] = useState("2");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Extrato Detalhado", 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Período: ${months.find(m => m.value === selectedMonth)?.label} de ${selectedYear}`, 14, 30);
    
    const startX = 14;
    const colWidths = {
      date: 30,
      type: 50,
      description: 65,
      value: 25,
      balance: 25
    };
    
    let y = 45;
    
    doc.setFillColor(247, 248, 249);
    doc.rect(startX, y - 5, 185, 8, 'F');
    
    doc.setFont("helvetica", "bold");
    let currentX = startX;
    
    doc.text("Data", currentX, y);
    currentX += colWidths.date;
    doc.text("Histórico", currentX, y);
    currentX += colWidths.type;
    doc.text("Descrição", currentX, y);
    currentX += colWidths.description;
    const valorText = "Valor";
    const valorWidth = doc.getTextWidth(valorText);
    doc.text(valorText, currentX + colWidths.value - valorWidth - 2, y);
    currentX += colWidths.value;
    const saldoText = "Saldo";
    const saldoWidth = doc.getTextWidth(saldoText);
    doc.text(saldoText, currentX + colWidths.balance - saldoWidth - 2, y);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    
    filteredTransactions.forEach((transaction, index) => {
      y += 10;
      
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      
      if (index % 2 === 0) {
        doc.setFillColor(249, 250, 251);
        doc.rect(startX, y - 5, 185, 8, 'F');
      }
      
      doc.setTextColor(0, 0, 0);
      currentX = startX;
      
      doc.text(transaction.date, currentX, y);
      currentX += colWidths.date;
      doc.text(transaction.type, currentX, y);
      currentX += colWidths.type;
      doc.text(transaction.description, currentX, y);
      currentX += colWidths.description;
      doc.setTextColor(34, 197, 94);
      const valueWidth = doc.getTextWidth(transaction.value);
      doc.text(transaction.value, currentX + colWidths.value - valueWidth - 2, y);
      currentX += colWidths.value;
      doc.setTextColor(0, 0, 0);
      const balanceWidth = doc.getTextWidth(transaction.balance);
      doc.text(transaction.balance, currentX + colWidths.balance - balanceWidth - 2, y);
    });
    
    y += 20;
    doc.text(`Total de registros: ${filteredTransactions.length}`, 14, y);
    
    doc.save(`extrato-${selectedMonth}-${selectedYear}.pdf`);
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
    "2023",
    "2024",
    "2025",
    "2026"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#3B0764] text-white px-6 py-4">
        <h1 className="text-xl font-normal mb-1">Financeiro</h1>
        <h2 className="text-2xl font-semibold">Extrato Detalhado</h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-8 w-[600px]">
          <div className="flex items-center gap-4 mb-6">
            <FilterX className="w-5 h-5" />
            <span className="font-medium">Filtros</span>
          </div>
          <div className="flex gap-4 mb-4">
            <select 
              className="border rounded-md px-4 py-2 w-[250px]"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select 
              className="border rounded-md px-4 py-2 w-[250px]"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button 
              onClick={filterTransactions}
              className="bg-[#00B8D4] text-white px-6 h-9 rounded-md hover:bg-[#00A0BC] transition-colors"
            >
              Filtrar
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 mx-auto w-[800px]">
          <div className="bg-[#8BC34A] text-white py-3 px-5 rounded-lg w-[250px]">
            <div className="text-xl font-bold mb-1">R$ 42.576,22</div>
            <div className="text-sm">Total de ganhos em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] py-3 px-5 rounded-lg w-[250px]">
            <div className="text-xl font-bold mb-1">R$ 47.576,23</div>
            <div className="text-sm text-gray-600">Saldo em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] py-3 px-5 rounded-lg w-[250px]">
            <div className="text-xl font-bold mb-1">R$ 5.000,01</div>
            <div className="text-sm text-gray-600">Saldo disponível em Fevereiro/2025</div>
          </div>
        </div>

        <div className="flex md:justify-end mb-6">
          <div className="text-gray-700">
            <span className="font-semibold">Saldo anterior: </span>
            <span>R$0,00</span>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border rounded-md px-4 h-9 w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterTransactions();
            }}
          />
          <button 
            onClick={handleExportPDF}
            className="bg-gray-800 text-white px-6 h-9 rounded-md hover:bg-gray-700 transition-colors"
          >
            Baixar em PDF
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden border mx-auto w-[800px]">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold w-[100px] text-black">Data</TableHead>
                <TableHead className="font-semibold w-[200px] text-black">Histórico</TableHead>
                <TableHead className="font-semibold w-[240px] text-black">Descrição</TableHead>
                <TableHead className="font-semibold text-right w-[130px] text-black">Valor</TableHead>
                <TableHead className="font-semibold text-right w-[130px] text-black">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction, index) => (
                <TableRow key={index} className="border-b hover:bg-gray-50">
                  <TableCell className="w-[100px]">{transaction.date}</TableCell>
                  <TableCell className="font-medium w-[200px]">{transaction.type}</TableCell>
                  <TableCell className="w-[240px] truncate">{transaction.description}</TableCell>
                  <TableCell className="text-right text-green-600 w-[130px]">{transaction.value}</TableCell>
                  <TableCell className="text-right w-[130px]">{transaction.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Total de {filteredTransactions.length} registros
        </div>
      </div>
    </div>
  );
}
