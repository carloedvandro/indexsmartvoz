
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActionButtons, DeleteUserDialog, PaymentDetailsDialog } from "./actions";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
}

export const UserActions = ({ user, onEdit }: UserActionsProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
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
    setIsPaymentDetailsOpen(true);
  };

  return (
    <div className="flex space-x-1">
      <ActionButtons 
        user={user}
        isUnlocked={isUnlocked}
        onEdit={onEdit}
        onInfoClick={openPaymentDetails}
        onToggleLock={toggleLock}
      />
      
      <DeleteUserDialog 
        user={user}
        isUnlocked={isUnlocked}
      />

      <PaymentDetailsDialog 
        user={user}
        isOpen={isPaymentDetailsOpen}
        onOpenChange={setIsPaymentDetailsOpen}
      />
    </div>
  );
};
