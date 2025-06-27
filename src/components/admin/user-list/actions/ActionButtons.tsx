
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { AsaasAccountButton } from "./AsaasAccountButton";

interface User {
  id: string;
  full_name: string;
  email: string;
  cpf?: string;
  asaas_account_id?: string;
}

interface ActionButtonsProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAsaasSuccess?: () => void;
}

export function ActionButtons({ 
  user, 
  onView, 
  onEdit, 
  onDelete,
  onAsaasSuccess 
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onView(user)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(user)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      
      <AsaasAccountButton
        user={user}
        onSuccess={onAsaasSuccess}
      />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(user)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
