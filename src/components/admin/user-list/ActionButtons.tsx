
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PencilIcon, Trash2, Network } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteUserDialog } from "./actions/DeleteUserDialog";
import { PlanDetailsDialog } from "./actions/PlanDetailsDialog";
import { PaymentDetailsDialog } from "./actions/PaymentDetailsDialog";

export function ActionButtons({ user, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handleViewNetwork = () => {
    navigate(`/admin/network?userId=${user.id}`);
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
      
      <Button
        variant="ghost"
        className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
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
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setIsPlanDialogOpen(true)}
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
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={() => {
          onDelete(user.id);
          setIsDeleteDialogOpen(false);
        }}
        userName={user.full_name}
      />

      <PlanDetailsDialog
        open={isPlanDialogOpen}
        onOpenChange={setIsPlanDialogOpen}
        user={user}
      />

      <PaymentDetailsDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        user={user}
      />
    </div>
  );
}
