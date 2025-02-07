
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export function AccessLogsTab({ userId }: { userId: string }) {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["officeLogs", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("office_access_logs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const formattedLogs = useMemo(() => {
    return logs?.map(log => ({
      ...log,
      created_at: format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss"),
    }));
  }, [logs]);

  if (isLoading) {
    return <div>Carregando logs...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Logs de Acesso ao Escritório</h3>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Navegador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedLogs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.created_at}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.ip_address}</TableCell>
                <TableCell>{log.user_agent}</TableCell>
              </TableRow>
            ))}
            {!formattedLogs?.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Nenhum log encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
