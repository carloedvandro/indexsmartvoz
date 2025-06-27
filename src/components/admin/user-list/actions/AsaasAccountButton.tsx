
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateAsaasAccountDialog } from "./CreateAsaasAccountDialog";
import { CreditCard, CheckCircle2 } from "lucide-react";

interface AsaasAccountButtonProps {
  user: {
    id: string;
    full_name: string;
    email: string;
    cpf?: string;
    asaas_account_id?: string;
  };
  onSuccess?: () => void;
}

export function AsaasAccountButton({ user, onSuccess }: AsaasAccountButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasAsaasAccount = !!user.asaas_account_id;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={hasAsaasAccount ? "default" : "outline"}
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className={hasAsaasAccount ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {hasAsaasAccount ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasAsaasAccount ? "Subconta Asaas ativa" : "Criar subconta Asaas"}
        </TooltipContent>
      </Tooltip>

      <CreateAsaasAccountDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={user}
        onSuccess={onSuccess}
      />
    </TooltipProvider>
  );
}
