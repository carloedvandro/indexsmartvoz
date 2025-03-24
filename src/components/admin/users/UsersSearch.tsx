
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSearchForm } from "@/components/admin/UserSearchForm";
import { UserFilters } from "@/hooks/useAdminUsers";

interface UsersSearchProps {
  filters: UserFilters;
  setFilters: (filters: UserFilters) => void;
  onSearch: () => void;
}

export function UsersSearch({ filters, setFilters, onSearch }: UsersSearchProps) {
  return (
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
          onSearch={onSearch}
        />
      </CardContent>
    </Card>
  );
}
