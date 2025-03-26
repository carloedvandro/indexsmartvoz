
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserSearchForm } from "@/components/admin/UserSearchForm";
import { UsersTable } from "@/components/admin/UsersTable";
import { UserEditDialog } from "@/components/admin/UserEditDialog";
import { useUserSearch, UserFilters } from "@/hooks/useUserSearch";

export function AdminUsersContent() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, isLoading, filters, setFilters, handleSearch, refetch } = useUserSearch();

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdated = () => {
    refetch();
    setSelectedUser(null);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Busca Avançada</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar usuários específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserSearchForm
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </CardContent>
      </Card>

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
              onEdit={handleEdit} 
              refetch={refetch}
            />
          )}
        </CardContent>
      </Card>

      <UserEditDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        onUserUpdated={handleUserUpdated}
      />
    </>
  );
}
