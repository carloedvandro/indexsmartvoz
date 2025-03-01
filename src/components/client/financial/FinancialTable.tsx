
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FinancialTableProps {
  filteredTransactions: any[];
  isMobile: boolean;
}

export function FinancialTable({ filteredTransactions, isMobile }: FinancialTableProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border mx-auto w-full md:w-[780px] overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold min-w-[100px] text-black pl-6 text-lg">Data</TableHead>
            <TableHead className="font-semibold min-w-[200px] text-black pl-9 text-lg">Histórico</TableHead>
            <TableHead className="font-semibold min-w-[240px] text-black pl-4 text-lg">Descrição</TableHead>
            <TableHead className="font-semibold min-w-[130px] text-black text-lg -translate-x-4">Valor</TableHead>
            <TableHead className={`font-semibold min-w-[130px] text-black text-lg md:pl-0 md:-translate-x-[11px] ${isMobile ? 'pl-6' : ''}`}>Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-50">
              <TableCell className="min-w-[100px] pl-6">{transaction.date}</TableCell>
              <TableCell className="font-medium min-w-[200px] pl-9">{transaction.type}</TableCell>
              <TableCell className="min-w-[240px] truncate pl-4">{transaction.description}</TableCell>
              <TableCell className="text-green-600 min-w-[130px] -translate-x-4 whitespace-nowrap pr-1">{transaction.value}</TableCell>
              <TableCell className={`min-w-[130px] md:pl-[3.3px] md:-translate-x-[11px] ${isMobile ? 'pl-6' : ''} whitespace-nowrap`}>{transaction.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
