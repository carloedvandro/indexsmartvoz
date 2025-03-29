
import { useState } from "react";
import { MoreHorizontal, ChevronUp, ChevronDown, Lock, Unlock } from "lucide-react";
import { UserActions } from "./UserActions";
import { Button } from "@/components/ui/button";
import { ProfileWithSponsor } from "@/types/profile";
import { BrazilFlag } from "./BrazilFlag";
import { formatDate } from "@/utils/format";

interface ExpandableRowProps {
  user: ProfileWithSponsor;
  onEdit: (user: any) => void;
  onDelete: (userId: string) => void;
}

export const ExpandableRow = ({ user, onEdit, onDelete }: ExpandableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const statusColor = user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  const statusText = user.status === "active" ? "Ativo" : "Bloqueado";

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-3">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 h-6 w-6 rounded-full mr-2"
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </Button>
            <span>{user.id.substring(0, 8)}...</span>
          </div>
        </td>
        <td className="px-4 py-3">{user.custom_id || "-"}</td>
        <td className="px-4 py-3">{user.full_name || "-"}</td>
        <td className="px-4 py-3">{user.email || "-"}</td>
        <td className="px-4 py-3">
          <div className="flex items-center">
            <BrazilFlag />
            <span className="ml-1 text-gray-600">{user.phone || "-"}</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {statusText}
          </span>
        </td>
        <td className="px-4 py-3">{user.sponsor?.full_name || "-"}</td>
        <td className="px-4 py-3">{user.created_at ? formatDate(user.created_at) : "-"}</td>
        <td className="px-4 py-3">
          <UserActions 
            user={user} 
            onEdit={onEdit} 
            onDelete={onDelete}
          />
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={9} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Informações Pessoais</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">ID:</span> {user.id}</p>
                  <p><span className="font-medium">Nome:</span> {user.full_name}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">CPF:</span> {user.cpf || "-"}</p>
                  <p><span className="font-medium">Data de Nascimento:</span> {user.birth_date ? formatDate(user.birth_date) : "-"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Informações de Contato</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Telefone:</span> {user.phone || "-"}</p>
                  <p><span className="font-medium">Celular:</span> {user.mobile || "-"}</p>
                  <p><span className="font-medium">WhatsApp:</span> {user.whatsapp || "-"}</p>
                  <p><span className="font-medium">Endereço:</span> {user.address || "-"}</p>
                  <p><span className="font-medium">Cidade:</span> {user.city || "-"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Informações da Conta</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Status:</span> {statusText}</p>
                  <p><span className="font-medium">ID Personalizado:</span> {user.custom_id || "-"}</p>
                  <p><span className="font-medium">Patrocinador:</span> {user.sponsor?.full_name || "-"}</p>
                  <p><span className="font-medium">Data de Criação:</span> {user.created_at ? formatDate(user.created_at) : "-"}</p>
                  <p><span className="font-medium">Último Login:</span> {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : "-"}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
