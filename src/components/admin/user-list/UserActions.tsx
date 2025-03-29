
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActionButtons, DeleteUserDialog, PaymentDetailsDialog } from "./actions";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
  onDelete?: (userId: string) => void;
}

export const UserActions = ({ user, onEdit, onDelete }: UserActionsProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const toggleLock = () => {
    setIsUnlocked(!isUnlocked);
    
    // Show toast notification for lock status change
    toast({
      title: isUnlocked ? "Usuário bloqueado" : "Usuário desbloqueado",
      description: isUnlocked 
        ? "As configurações do usuário foram bloqueadas." 
        : "As configurações do usuário foram desbloqueadas para edição.",
    });
  };

  const openPaymentDetails = () => {
    console.log("Opening payment details for user:", user);
    setIsPaymentDetailsOpen(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(user.id);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex space-x-1">
      <ActionButtons 
        user={user}
        isUnlocked={isUnlocked}
        onEdit={onEdit}
        onInfoClick={openPaymentDetails}
        onToggleLock={toggleLock}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />
      
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
        userName={user.full_name || ""}
      />

      <PaymentDetailsDialog 
        user={user}
        isOpen={isPaymentDetailsOpen}
        onOpenChange={setIsPaymentDetailsOpen}
      />
    </div>
  );
};
