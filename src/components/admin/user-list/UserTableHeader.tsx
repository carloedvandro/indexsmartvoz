
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserTableHeaderProps {
  areAllUsersSelected: boolean;
  toggleSelectAll: () => void;
}

export const UserTableHeader = ({ areAllUsersSelected, toggleSelectAll }: UserTableHeaderProps) => {
  return (
    <TableHeader className="bg-gray-200">
      <TableRow>
        <TableHead className="w-10">
          <Checkbox 
            checked={areAllUsersSelected}
            onCheckedChange={toggleSelectAll}
            className="rounded border-gray-300"
          />
        </TableHead>
        <TableHead>Detalhes do Usuário</TableHead>
        <TableHead>Detalhes da Associação</TableHead>
        <TableHead className="whitespace-nowrap">Status do Usuário</TableHead>
        <TableHead>Patrocinador</TableHead>
        <TableHead>Ação</TableHead>
      </TableRow>
    </TableHeader>
  );
};
