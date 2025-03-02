
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
    <div className="bg-white rounded-lg overflow-hidden border mx-auto w-full md:w-[680px] overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-black pl-6 text-sm">Data</TableHead>
            <TableHead className="font-semibold text-black pl-4 text-sm">Histórico</TableHead>
            <TableHead className="font-semibold text-black pl-4 text-sm">Descrição</TableHead>
            <TableHead className="font-semibold text-black text-sm pl-8">Valor</TableHead>
            <TableHead className="font-semibold text-black text-sm pl-8">Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-50">
              <TableCell className="pl-6 text-xs">{transaction.date}</TableCell>
              <TableCell className="font-medium pl-4 text-xs">{transaction.type}</TableCell>
              <TableCell className="truncate pl-4 text-xs">{transaction.description}</TableCell>
              <TableCell className="text-green-600 text-right pr-4 text-xs whitespace-nowrap">{transaction.value}</TableCell>
              <TableCell className="text-right pr-6 text-xs whitespace-nowrap">{transaction.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
