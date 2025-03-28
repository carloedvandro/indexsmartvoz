
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody } from "@/components/ui/table";
import { ProfileWithSponsor } from "@/types/profile";
import { ExpandableRow } from "./ExpandableRow";
import { UserTableHeader } from "./UserTableHeader";

interface UsersTableProps {
  users: ProfileWithSponsor[];
  selectedUsers: string[];
  expandedRows: Record<string, boolean>;
  toggleUserSelection: (userId: string) => void;
  toggleRowExpand: (userId: string) => void;
  toggleSelectAll: () => void;
  areAllUsersSelected: boolean;
  onEdit: (user: any) => void;
  displayCustomId: (user: any) => string;
}

export const UsersTable = ({
  users,
  selectedUsers,
  expandedRows,
  toggleUserSelection,
  toggleRowExpand,
  toggleSelectAll,
  areAllUsersSelected,
  onEdit,
  displayCustomId
}: UsersTableProps) => {
  // Check if a user is selected
  const isUserSelected = (userId: string) => selectedUsers.includes(userId);

  // Check if a specific row is expanded
  const isRowExpanded = (userId: string) => expandedRows[userId] === true;

  return (
    <div className="overflow-x-auto">
      <Table>
        <UserTableHeader 
          areAllUsersSelected={areAllUsersSelected}
          toggleSelectAll={toggleSelectAll}
        />
        <TableBody>
          {users.map((user, index) => (
            <ExpandableRow
              key={user.id}
              user={user}
              index={index}
              isSelected={isUserSelected(user.id)}
              isExpanded={isRowExpanded(user.id)}
              toggleSelection={() => toggleUserSelection(user.id)}
              toggleExpand={() => toggleRowExpand(user.id)}
              onEdit={onEdit}
              displayCustomId={displayCustomId}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
