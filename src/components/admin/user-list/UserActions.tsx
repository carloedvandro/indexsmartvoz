
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActionButtons, DeleteUserDialog, PaymentDetailsDialog } from "./actions";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
}

export const UserActions = ({ user, onEdit }: UserActionsProps) => {
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleView = (user: any) => {
    console.log("Opening payment details for user:", user);
    setIsPaymentDetailsOpen(true);
  };

  const handleDelete = (user: any) => {
    console.log("Delete user:", user);
  };

  const handleAsaasSuccess = () => {
    toast({
      title: "Sucesso",
      description: "Subconta Asaas criada com sucesso",
    });
  };

  return (
    <div className="flex space-x-1">
      <ActionButtons 
        user={user}
        onView={handleView}
        onEdit={onEdit}
        onDelete={handleDelete}
        onAsaasSuccess={handleAsaasSuccess}
      />

      <PaymentDetailsDialog 
        user={user}
        isOpen={isPaymentDetailsOpen}
        onOpenChange={setIsPaymentDetailsOpen}
      />
    </div>
  );
};
