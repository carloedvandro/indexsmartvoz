
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
import { Badge } from "@/components/ui/badge";

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

  const getActionBadge = (action: string, passwordAction?: string | null) => {
    if (passwordAction) {
      switch (passwordAction) {
        case 'reset':
          return <Badge variant="destructive">Redefinição de Senha</Badge>;
        case 'change':
          return <Badge variant="default">Alteração de Senha</Badge>;
        default:
          return <Badge variant="secondary">{passwordAction}</Badge>;
      }
    }
    
    switch (action) {
      case 'login':
        return <Badge variant="default">Login</Badge>;
      case 'logout':
        return <Badge variant="destructive">Logout</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const getActionDetails = (log: any) => {
    if (log.password_action) {
      const metadata = log.password_metadata || {};
      return (
        <div className="space-y-1">
          {getActionBadge(log.action, log.password_action)}
          {metadata.reason && (
            <p className="text-sm text-muted-foreground">{metadata.reason}</p>
          )}
        </div>
      );
    }
    return getActionBadge(log.action);
  };

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
                <TableCell>{getActionDetails(log)}</TableCell>
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

