
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export function CustomersList() {
  const [customers] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      phone: "(11) 99999-9999",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@example.com",
      phone: "(11) 88888-8888",
      status: "Ativo",
    },
  ]);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Clientes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
