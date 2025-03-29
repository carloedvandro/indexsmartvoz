import { useState } from "react";
import { ProfileWithSponsor } from "@/types/profile";
import { displayCustomId, SearchFilters, UsersTable } from "./user-list";

interface AdminUsersListProps {
  users?: ProfileWithSponsor[];
  onEdit: (user: any) => void;
  onDelete?: (userId: string) => void;
}

export function AdminUsersList({ users = [], onEdit, onDelete }: AdminUsersListProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Handle individual user selection
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle select all checkbox
  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      // If all are selected, deselect all
      setSelectedUsers([]);
    } else {
      // Otherwise, select all
      setSelectedUsers(users.map(user => user.id));
    }
  };

  // Toggle row expansion
  const toggleRowExpand = (userId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Check if all users are selected
  const areAllUsersSelected = users.length > 0 && selectedUsers.length === users.length;

  return (
    <div className="bg-white rounded-lg shadow">
      <SearchFilters 
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        emailFilter={emailFilter}
        setEmailFilter={setEmailFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
      />
      
      <div className="px-4 py-2">
        <div className="bg-indigo-500 text-white py-1 px-3 rounded inline-block">
          Mostrar usuários ({users.length || 0})
        </div>
      </div>
      
      <UsersTable 
        users={users}
        selectedUsers={selectedUsers}
        expandedRows={expandedRows}
        toggleUserSelection={toggleUserSelection}
        toggleRowExpand={toggleRowExpand}
        toggleSelectAll={toggleSelectAll}
        areAllUsersSelected={areAllUsersSelected}
        onEdit={onEdit}
        displayCustomId={displayCustomId}
        onDelete={onDelete}
      />
    </div>
  );
}
