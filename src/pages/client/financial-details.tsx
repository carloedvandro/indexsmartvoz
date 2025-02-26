
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
    { date: '10/02/2025', type: 'BÔNUS DE EQUIPE', description: 'LANÇAMENTO FINANCEIRO 11546', value: 'R$ 4.059,05', balance: 'R$ 10.848,84' },
    { date: '11/02/2025', type: 'BÔNUS DE INDICAÇÃO', description: 'LANÇAMENTO FINANCEIRO 9398', value: 'R$ 10,00', balance: 'R$ 10.858,84' },
    { date: '11/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 9597', value: 'R$ 3.543,88', balance: 'R$ 14.402,72' },
    { date: '11/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 12092', value: 'R$ 1.323,26', balance: 'R$ 15.725,98' },
    { date: '13/02/2025', type: 'BÔNUS DE EQUIPE', description: 'LANÇAMENTO FINANCEIRO 10573', value: 'R$ 9.012,98', balance: 'R$ 24.738,96' },
    { date: '14/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 11979', value: 'R$ 169,37', balance: 'R$ 24.908,33' },
    { date: '15/02/2025', type: 'BÔNUS DE INDICAÇÃO', description: 'LANÇAMENTO FINANCEIRO 11404', value: 'R$ 30,00', balance: 'R$ 24.938,33' },
    { date: '16/02/2025', type: 'IMPOSTO DE RENDA', description: 'LANÇAMENTO FINANCEIRO 8697', value: 'R$ 0,00', balance: 'R$ 24.938,33' },
    { date: '18/02/2025', type: 'BÔNUS DE EQUIPE', description: 'LANÇAMENTO FINANCEIRO 8173', value: 'R$ 6.495,92', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'INSS', description: 'LANÇAMENTO FINANCEIRO 8696', value: 'R$ 0,00', balance: 'R$ 31.434,25' },
    { date: '18/02/2025', type: 'BÔNUS DE EQUIPE', description: 'LANÇAMENTO FINANCEIRO 9419', value: 'R$ 6.589,96', balance: 'R$ 38.024,21' },
    { date: '18/02/2025', type: 'CRÉDITO', description: 'TESTE', value: 'R$ 5.000,00', balance: 'R$ 43.024,21' },
    { date: '20/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 11768', value: 'R$ 172,40', balance: 'R$ 43.196,61' },
    { date: '21/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 12061', value: 'R$ 1.105,92', balance: 'R$ 44.302,53' },
    { date: '23/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 8321', value: 'R$ 2.796,81', balance: 'R$ 47.099,34' },
    { date: '23/02/2025', type: 'BÔNUS DE INDICAÇÃO', description: 'LANÇAMENTO FINANCEIRO 11403', value: 'R$ 30,00', balance: 'R$ 47.129,34' },
    { date: '23/02/2025', type: 'BÔNUS', description: 'LANÇAMENTO FINANCEIRO 12027', value: 'R$ 446,89', balance: 'R$ 47.576,23' },
    { date: '24/02/2025', type: 'SOLICITACAO DE SAQUE', description: 'LANÇAMENTO FINANCEIRO 8695', value: 'R$ 0,00', balance: 'R$ 47.576,23' },
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
            <span className="font-semibold">R$ 6.789,79</span>
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
