
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface PhoneLine {
  id: string;
  phone_number: string;
  client_name: string;
  plan_name: string;
  data_limit: number;
  data_used: number;
  bonus_data: number;
  bonus_used: number;
  status: string;
}

interface PhoneLineTableProps {
  phoneLines: PhoneLine[];
  onUpdateUsage: (lineId: string, newUsage: number) => Promise<void>;
  isLoading: boolean;
}

export function PhoneLineTable({ phoneLines, onUpdateUsage, isLoading }: PhoneLineTableProps) {
  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Plano</TableHead>
          <TableHead>Consumo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {phoneLines?.map((line) => (
          <TableRow key={line.id}>
            <TableCell>{line.phone_number}</TableCell>
            <TableCell>{line.client_name}</TableCell>
            <TableCell>{line.plan_name}</TableCell>
            <TableCell>
              {line.data_used}/{line.data_limit} GB
              {line.bonus_data > 0 && ` + ${line.bonus_used}/${line.bonus_data} GB bônus`}
            </TableCell>
            <TableCell>{line.status}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newUsage = Number(prompt("Digite o novo consumo em GB:"));
                  if (!isNaN(newUsage)) {
                    onUpdateUsage(line.id, newUsage);
                  }
                }}
              >
                Atualizar Consumo
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
