
import { useLocation, useNavigate } from "react-router-dom";
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
import { Filter } from "lucide-react";
import jsPDF from "jspdf";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    
    // Centraliza o título
    doc.setFontSize(18);
    const title = "Extrato Detalhado";
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.width;
    doc.text(title, (pageWidth - titleWidth) / 2, 30);
    
    // Centraliza o período
    doc.setFontSize(12);
    const period = `Período: ${months.find(m => m.value === selectedMonth)?.label} de ${selectedYear}`;
    const periodWidth = doc.getTextWidth(period);
    doc.text(period, (pageWidth - periodWidth) / 2, 45);
    
    // Define margens laterais para centralizar a tabela
    const margin = 5; // Margem reduzida para aumentar a largura disponível
    const tableWidth = pageWidth - (margin * 2);
    
    // Define larguras proporcionais para cada coluna
    const colWidths = {
      date: Math.floor(tableWidth * 0.15),
      type: Math.floor(tableWidth * 0.20),
      description: Math.floor(tableWidth * 0.25),
      value: Math.floor(tableWidth * 0.20),
      balance: Math.floor(tableWidth * 0.20)
    };
    
    let y = 65;
    
    // Cabeçalho da tabela
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 5, tableWidth, 7, 'F');
    
    doc.setFont("helvetica", "bold");
    let currentX = margin;
    
    // Cabeçalho Data
    doc.text("Data", currentX + 5, y);
    currentX += colWidths.date;
    
    // Cabeçalho Histórico
    doc.text("Histórico", currentX + 5, y);
    currentX += colWidths.type;
    
    // Cabeçalho Descrição
    doc.text("Descrição", currentX + 5, y);
    currentX += colWidths.description;
    
    // Cabeçalho Valor (alinhado à direita)
    const valorText = "Valor";
    const valorWidth = doc.getTextWidth(valorText);
    doc.text(valorText, currentX + colWidths.value - valorWidth - 5, y);
    currentX += colWidths.value;
    
    // Cabeçalho Saldo (alinhado à direita)
    const saldoText = "Saldo";
    const saldoWidth = doc.getTextWidth(saldoText);
    doc.text(saldoText, currentX + colWidths.balance - saldoWidth - 5, y);
    
    doc.setFont("helvetica", "normal");
    
    // Adiciona linhas da tabela com espaçamento adequado
    const lineHeight = 8; // Reduzido para aproximar as linhas
    y += 8; // Espaço após o cabeçalho reduzido
    
    filteredTransactions.forEach((transaction, index) => {
      // Adiciona fundo alternado para melhorar a legibilidade
      if (index % 2 === 0) {
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, y - 4, tableWidth, lineHeight + 2, 'F');
      }
      
      currentX = margin;
      
      // Coluna Data
      doc.setTextColor(0, 0, 0);
      doc.text(transaction.date, currentX + 5, y);
      currentX += colWidths.date;
      
      // Coluna Histórico
      doc.text(transaction.type, currentX + 5, y);
      currentX += colWidths.type;
      
      // Coluna Descrição
      doc.text(transaction.description, currentX + 5, y);
      currentX += colWidths.description;
      
      // Coluna Valor (verde e alinhado à direita)
      doc.setTextColor(34, 197, 94);
      const valueWidth = doc.getTextWidth(transaction.value);
      doc.text(transaction.value, currentX + colWidths.value - valueWidth - 5, y);
      currentX += colWidths.value;
      
      // Coluna Saldo (preto e alinhado à direita)
      doc.setTextColor(0, 0, 0);
      const balanceWidth = doc.getTextWidth(transaction.balance);
      doc.text(transaction.balance, currentX + colWidths.balance - balanceWidth - 5, y);
      
      y += lineHeight + 1; // Reduzido o espaçamento entre as linhas
    });
    
    // Adiciona o total de registros na parte inferior
    y += 8;
    doc.text(`Total de registros: ${filteredTransactions.length}`, margin, y);
    
    doc.save(`extrato-${selectedMonth}-${selectedYear}.pdf`);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#3B0764] text-white px-6 py-4">
        <h1 className="text-xl font-normal mb-1">Financeiro</h1>
        <h2 className="text-2xl font-semibold">Extrato Detalhado</h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 md:mb-8 w-full md:w-[780px] mx-auto">
          <div className="border rounded-lg bg-white p-6 shadow-sm w-full">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-4 h-4 text-[#5f0889]" />
              <span className="text-sm font-medium text-gray-900">Filtros</span>
            </div>
            <div className="flex flex-row justify-between gap-4">
              <div className="w-1/2 md:w-[250px]">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Mês
                </label>
                <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger 
                    className="w-full !bg-white text-gray-900 border-gray-300"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-200 rounded-md shadow-md">
                    {months.map((month) => (
                      <SelectItem 
                        key={month.value} 
                        value={month.value}
                        className="hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white py-2 px-2"
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-1/2 md:w-[250px]">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Ano
                </label>
                <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger 
                    className="w-full !bg-white text-gray-900 border-gray-300"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-200 rounded-md shadow-md">
                    {years.map((year) => (
                      <SelectItem 
                        key={year.value} 
                        value={year.value}
                        className="hover:!bg-[#5f0889] hover:!text-white focus:!bg-[#5f0889] focus:!text-white data-[state=checked]:!bg-[#5f0889] data-[state=checked]:!text-white py-2 px-2"
                      >
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={handleBack}
                className="border border-[#5f0889] text-[#5f0889] h-9 rounded-md hover:bg-[#5f0889] hover:text-white transition-colors w-[80px]"
              >
                Voltar
              </button>
              <button 
                onClick={filterTransactions}
                className="bg-[#5f0889] text-white h-9 rounded-md hover:bg-[#5f0889]/90 transition-colors w-[80px]"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8 mx-auto w-full md:w-[780px]">
          <div className="bg-[#5f0889] text-white py-3 px-5 rounded-lg w-full md:w-[250px]">
            <div className="text-xl font-bold mb-1">R$ 42.576,22</div>
            <div className="text-sm">Total de ganhos em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] py-3 px-5 rounded-lg w-full md:w-[250px]">
            <div className="text-xl font-bold mb-1">R$ 47.576,23</div>
            <div className="text-sm text-gray-600">Saldo em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] py-3 px-5 rounded-lg w-full md:w-[250px]">
            <div className="text-xl font-bold mb-1">R$ 5.000,01</div>
            <div className="text-sm text-gray-600">Saldo disponível em Fevereiro/2025</div>
          </div>
        </div>

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
          <button 
            onClick={handleExportPDF}
            className="bg-[#5f0889] text-white px-6 h-9 rounded-md hover:bg-[#5f0889]/90 transition-colors whitespace-nowrap"
          >
            Baixar em PDF
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden border mx-auto w-full md:w-[780px] overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold min-w-[100px] text-black pl-6 text-lg">Data</TableHead>
                <TableHead className="font-semibold min-w-[200px] text-black pl-9 text-lg">Histórico</TableHead>
                <TableHead className="font-semibold min-w-[240px] text-black pl-4 text-lg">Descrição</TableHead>
                <TableHead className="font-semibold min-w-[130px] text-black text-lg -translate-x-4">Valor</TableHead>
                <TableHead className={`font-semibold min-w-[130px] text-black text-lg md:pl-0 md:-translate-x-1.5 ${isMobile ? 'pl-12' : ''}`}>Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction, index) => (
                <TableRow key={index} className="border-b hover:bg-gray-50">
                  <TableCell className="min-w-[100px] pl-6">{transaction.date}</TableCell>
                  <TableCell className="font-medium min-w-[200px] pl-9">{transaction.type}</TableCell>
                  <TableCell className="min-w-[240px] truncate pl-4">{transaction.description}</TableCell>
                  <TableCell className="text-green-600 min-w-[130px] -translate-x-4">{transaction.value}</TableCell>
                  <TableCell className={`min-w-[130px] md:pl-0 md:-translate-x-1.5 ${isMobile ? 'pl-12' : ''}`}>{transaction.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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
    </div>
  );
}
