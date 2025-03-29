
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PencilIcon, Trash2, Network, Lock, Unlock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { PlanDetailsDialog } from "./PlanDetailsDialog";
import { PaymentDetailsDialog } from "./PaymentDetailsDialog";

interface ActionButtonsProps {
  user: any;
  onEdit: (user: any) => void;
  onDelete: (userId: string) => void;
  isUnlocked?: boolean;
  onInfoClick?: () => void;
  onToggleLock?: () => void;
  onDeleteClick?: () => void;
}

export function ActionButtons({ 
  user, 
  onEdit, 
  onDelete,
  isUnlocked,
  onInfoClick,
  onToggleLock,
  onDeleteClick
}: ActionButtonsProps) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handleViewNetwork = () => {
    navigate(`/admin/network?userId=${user.id}`);
  };

  // Make sure handleDelete returns a Promise
  const handleDelete = async (): Promise<void> => {
    onDelete(user.id);
    return Promise.resolve();
  };

  const openDeleteDialog = () => {
    if (onDeleteClick) {
      onDeleteClick();
    } else {
      setIsDeleteDialogOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
        onClick={() => onEdit(user)}
      >
        <PencilIcon className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      
      {onToggleLock && (
        <Button
          variant="ghost"
          className={`h-8 w-8 p-0 ${isUnlocked ? 'text-red-600' : 'text-green-600'}`}
          onClick={onToggleLock}
        >
          {isUnlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          <span className="sr-only">{isUnlocked ? 'Lock' : 'Unlock'}</span>
        </Button>
      )}
      
      <Button
        variant="ghost"
        className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        onClick={handleViewNetwork}
      >
        <Network className="h-4 w-4" />
        <span className="sr-only">Network</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-slate-600 hover:text-slate-700 hover:bg-slate-100"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem
            className="text-red-600 cursor-pointer flex items-center gap-2"
            onClick={openDeleteDialog}
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => onInfoClick ? onInfoClick() : setIsPlanDialogOpen(true)}
          >
            <span>Detalhes do Plano</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setIsPaymentDialogOpen(true)}
          >
            <span>Detalhes de Pagamento</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
        userName={user.full_name}
      />

      <PlanDetailsDialog
        isOpen={isPlanDialogOpen}
        onOpenChange={setIsPlanDialogOpen}
        user={user}
      />

      <PaymentDetailsDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        user={user}
      />
    </div>
  );
}
