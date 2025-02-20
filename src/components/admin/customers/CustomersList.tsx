
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  customer_name: string;
  email: string | null;
  phone_number: string;
  status: string | null;
  data_used: number | null;
  data_limit: number | null;
}

export function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const { data, error } = await supabase
        .from('customer_lines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCustomers(data || []);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function formatDataUsage(used?: number | null, limit?: number | null): string {
    if (used === null || limit === null) return '-';
    const usedGB = (used / 1024).toFixed(2);
    const limitGB = (limit / 1024).toFixed(2);
    return `${usedGB}GB / ${limitGB}GB`;
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <p>Carregando...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Clientes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Consumo</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.customer_name}</TableCell>
              <TableCell>{customer.email || '-'}</TableCell>
              <TableCell>{customer.phone_number}</TableCell>
              <TableCell>
                {formatDataUsage(customer.data_used, customer.data_limit)}
              </TableCell>
              <TableCell>{customer.status || 'Ativo'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
