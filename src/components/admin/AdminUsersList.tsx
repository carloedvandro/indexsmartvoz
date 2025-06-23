
import { useState } from "react";
import { ProfileWithSponsor } from "@/types/profile";
import { SearchFilters, UsersTable } from "./user-list";

export function AdminUsersList({ users = [], onEdit }) {
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleView = (user: any) => {
    console.log("View user:", user);
  };

  const handleDelete = (user: any) => {
    console.log("Delete user:", user);
  };

  const handleAsaasSuccess = () => {
    console.log("Asaas account created successfully");
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <SearchFilters 
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      
      <div className="px-4 py-2">
        <div className="bg-indigo-500 text-white py-1 px-3 rounded inline-block">
          Mostrar usuários ({users.length || 0})
        </div>
      </div>
      
      <UsersTable 
        users={users}
        isLoading={false}
        onView={handleView}
        onEdit={onEdit}
        onDelete={handleDelete}
        onAsaasSuccess={handleAsaasSuccess}
      />
    </div>
  );
}
