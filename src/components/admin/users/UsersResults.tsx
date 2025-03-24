
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersTable } from "@/components/admin/UsersTable";

interface UsersResultsProps {
  users: any[] | null;
  isLoading: boolean;
  onEdit: (user: any) => void;
  refetch: () => void;
}

export function UsersResults({ users, isLoading, onEdit, refetch }: UsersResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados da Busca</CardTitle>
        {users && (
          <CardDescription>
            {users.length} usuário(s) encontrado(s)
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <UsersTable 
            users={users} 
            onEdit={onEdit} 
            refetch={refetch}
          />
        )}
      </CardContent>
    </Card>
  );
}
