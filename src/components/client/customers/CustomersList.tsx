
import { useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerForm } from './CustomerForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { LoadingState } from '@/components/client/dashboard/LoadingState';
import { Plus } from 'lucide-react';

export const CustomersList = () => {
  const { data: customers, isLoading } = useCustomers();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CustomerForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Consumo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.customer_name}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>{customer.plan_name || 'Não definido'}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>
                  {customer.data_used}/{customer.data_limit} MB
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
