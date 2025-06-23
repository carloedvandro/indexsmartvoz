
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserTableHeader } from "./UserTableHeader";
import { ExpandableRow } from "./ExpandableRow";

interface User {
  id: string;
  full_name: string;
  email: string;
  cpf?: string;
  role: string;
  status: string;
  created_at: string;
  asaas_account_id?: string;
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAsaasSuccess?: () => void;
}

export function UsersTable({ 
  users, 
  isLoading, 
  onView, 
  onEdit, 
  onDelete,
  onAsaasSuccess 
}: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum usuário encontrado.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <UserTableHeader />
      
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <ExpandableRow
            key={user.id}
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onAsaasSuccess={onAsaasSuccess}
          />
        ))}
      </div>
    </div>
  );
}
