
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { BrazilFlag } from "./BrazilFlag";
import { ActionButtons } from "./actions/ActionButtons";
import { formatDate } from "@/utils/format";

interface User {
  id: string;
  full_name: string;
  email: string;
  cpf?: string;
  role: string;
  status: string;
  created_at: string;
  phone?: string;
  city?: string;
  state?: string;
  asaas_account_id?: string;
}

interface ExpandableRowProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAsaasSuccess?: () => void;
}

export function ExpandableRow({ 
  user, 
  onView, 
  onEdit, 
  onDelete,
  onAsaasSuccess 
}: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'client':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
        <div className="col-span-3 flex items-center space-x-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <div>
            <div className="font-medium text-gray-900">
              {user.full_name || 'Nome não informado'}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>

        <div className="col-span-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>

        <div className="col-span-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
        </div>

        <div className="col-span-2 text-sm text-gray-900">
          {user.cpf || 'Não informado'}
        </div>

        <div className="col-span-1 flex justify-center">
          <BrazilFlag />
        </div>

        <div className="col-span-2 flex justify-end">
          <ActionButtons
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onAsaasSuccess={onAsaasSuccess}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Telefone:</span>
              <span className="ml-2 text-gray-900">{user.phone || 'Não informado'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Cidade:</span>
              <span className="ml-2 text-gray-900">{user.city || 'Não informada'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Estado:</span>
              <span className="ml-2 text-gray-900">{user.state || 'Não informado'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Cadastrado em:</span>
              <span className="ml-2 text-gray-900">{formatDate(user.created_at)}</span>
            </div>
            {user.asaas_account_id && (
              <div className="col-span-2">
                <span className="font-medium text-gray-500">Subconta Asaas:</span>
                <span className="ml-2 text-green-600 font-mono text-xs">{user.asaas_account_id}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
