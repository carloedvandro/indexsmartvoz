
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
    <div className="bg-white rounded-lg overflow-hidden border mx-auto w-full md:w-[540px]">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-black pl-6 py-3">Data</TableHead>
            <TableHead className="font-semibold text-black py-3">Histórico</TableHead>
            <TableHead className="font-semibold text-black py-3">Descrição</TableHead>
            <TableHead className="font-semibold text-black text-right pr-4 py-3">Valor</TableHead>
            <TableHead className="font-semibold text-black text-right pr-6 py-3">Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-50">
              <TableCell className="pl-6 py-4 text-[#113366]">{transaction.date}</TableCell>
              <TableCell className="font-medium py-4">{transaction.type}</TableCell>
              <TableCell className="py-4">{transaction.description}</TableCell>
              <TableCell className="text-[#02951e] text-right pr-4 py-4 whitespace-nowrap">{transaction.value}</TableCell>
              <TableCell className="text-right pr-6 py-4 whitespace-nowrap">{transaction.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
