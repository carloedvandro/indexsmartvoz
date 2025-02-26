
import { useLocation } from "react-router-dom";
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

export default function FinancialDetails() {
  const location = useLocation();
  const { type } = location.state || {};

  const transactions = [
    { date: '05/02/2025', type: 'DÉBITO', description: 'LANÇAMENTO FINANCEIRO 9736', value: 'R$ 0,00', balance: 'R$ 0,00' },
    { date: '05/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 10940', value: 'R$ 446,89', balance: 'R$ 446,89' },
    { date: '05/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 11769', value: 'R$ 1.732,64', balance: 'R$ 2.179,53' },
    { date: '06/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 10797', value: 'R$ 4.610,25', balance: 'R$ 6.789,78' },
    { date: '09/02/2025', type: 'CRÉDITO', description: 'LANÇAMENTO FINANCEIRO 5172', value: 'R$ 0,01', balance: 'R$ 6.789,79' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho Roxo */}
      <div className="bg-[#3B0764] text-white px-6 py-4">
        <h1 className="text-xl font-normal mb-1">Financeiro</h1>
        <h2 className="text-2xl font-semibold">Extrato Detalhado</h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Filtros */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <FilterX className="w-5 h-5" />
            <span className="font-medium">Filtros</span>
          </div>
          <div className="flex gap-4 mb-4">
            <select className="border rounded-md px-4 py-2 w-48">
              <option>Fevereiro</option>
            </select>
            <select className="border rounded-md px-4 py-2 w-48">
              <option>2025</option>
            </select>
            <button className="bg-[#00B8D4] text-white px-6 py-2 rounded-md hover:bg-[#00A0BC] transition-colors">
              Filtrar
            </button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#8BC34A] text-white p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">R$ 42.576,22</div>
            <div className="text-sm">Total de Ganhos em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">R$ 42.576,22</div>
            <div className="text-sm text-gray-600">Aprovisionado em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">R$ 47.576,23</div>
            <div className="text-sm text-gray-600">Saldo em Fevereiro/2025</div>
          </div>
          <div className="bg-[#E3F2FD] p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">R$ 5.000,01</div>
            <div className="text-sm text-gray-600">Saldo Disponível em Fevereiro/2025</div>
          </div>
        </div>

        {/* Saldo Anterior */}
        <div className="flex justify-end mb-6">
          <div className="text-right">
            <span className="font-semibold text-gray-700">SALDO ANTERIOR: </span>
            <span className="font-semibold">R$ 0,00</span>
          </div>
        </div>

        {/* Barra de Pesquisa e Exportar */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border rounded-md px-4 py-2 w-64"
          />
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
            Exportar para Excel
          </button>
        </div>

        {/* Tabela de Transações */}
        <div className="bg-white rounded-lg overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Data</TableHead>
                <TableHead className="font-semibold">Histórico</TableHead>
                <TableHead className="font-semibold">Descrição</TableHead>
                <TableHead className="font-semibold text-right">Valor</TableHead>
                <TableHead className="font-semibold text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right text-green-600">{transaction.value}</TableCell>
                  <TableCell className="text-right">{transaction.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando de 1 até 24 de 24 registros
        </div>
      </div>
    </div>
  );
}
