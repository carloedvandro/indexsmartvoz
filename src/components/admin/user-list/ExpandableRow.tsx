
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus } from "lucide-react";
import { UserActions } from "./UserActions";
import { ProfileWithSponsor } from "@/types/profile";

interface ExpandableRowProps {
  user: ProfileWithSponsor;
  index: number;
  isSelected: boolean;
  isExpanded: boolean;
  toggleSelection: () => void;
  toggleExpand: () => void;
  onEdit: (user: any) => void;
  displayCustomId: (user: any) => string;
}

export const ExpandableRow = ({
  user,
  index,
  isSelected,
  isExpanded,
  toggleSelection,
  toggleExpand,
  onEdit,
  displayCustomId
}: ExpandableRowProps) => {
  return (
    <>
      <TableRow className="border-b">
        <TableCell>
          <div className="flex items-center">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={toggleSelection}
              className="rounded border-gray-300 mr-2"
            />
            <span className="font-medium">{index + 1}</span>
            <button 
              className="ml-1 text-indigo-600 focus:outline-none"
              onClick={toggleExpand}
            >
              {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{user.full_name}</span>
            {displayCustomId(user) && (
              <span className="text-sm text-gray-500">Meu ID: {displayCustomId(user)}</span>
            )}
            <span className="text-sm text-blue-500">{user.email}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="italic text-gray-700">Plano não adquirido!</span>
            <a href="#" className="text-sm text-blue-500 hover:underline">Editar Plano</a>
          </div>
        </TableCell>
        <TableCell>
          {user.status === "pending" ? (
            <span className="text-red-500 font-medium">Pendente</span>
          ) : (
            <span className="text-green-500 font-medium">Ativo</span>
          )}
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{user?.sponsor?.full_name || "Não possui"}</span>
            {user?.sponsor?.custom_id && (
              <span className="text-sm text-gray-500">ID: {user.sponsor.custom_id}</span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <UserActions user={user} onEdit={onEdit} />
        </TableCell>
      </TableRow>
      
      {isExpanded && (
        <TableRow className="bg-gray-50">
          <TableCell className="w-10"></TableCell>
          <TableCell>
            <div className="text-sm text-gray-600">
              <p>Comissões Totais: R$0,00</p>
              <p>Celular: +5588993734779</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="text-sm text-gray-600">
              <p>Vendas/Comissões</p>
              <p>R$0,00 / R$0,00</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="text-sm text-gray-600 ml-7">
              <p>Comissão Paga: R$0,00</p>
            </div>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
    </>
  );
};
