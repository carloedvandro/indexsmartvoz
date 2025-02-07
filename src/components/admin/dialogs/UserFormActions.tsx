
import { Button } from "@/components/ui/button";
import { DeleteUserConfirmation } from "./DeleteUserConfirmation";
import { useState } from "react";
import { ChangeSponsorDialog } from "./ChangeSponsorDialog";

interface UserFormActionsProps {
  userId?: string;
  user?: any;
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  onSuccess?: () => void;
}

export function UserFormActions({ 
  userId, 
  user,
  isLoading, 
  isDeleting, 
  onDelete, 
  onCancel,
  onSuccess
}: UserFormActionsProps) {
  const [showChangeSponsor, setShowChangeSponsor] = useState(false);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2">
        {userId && (
          <>
            <DeleteUserConfirmation
              isDeleting={isDeleting}
              onDelete={onDelete}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowChangeSponsor(true)}
            >
              Alterar Patrocinador
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      {userId && (
        <ChangeSponsorDialog
          user={user}
          open={showChangeSponsor}
          onOpenChange={setShowChangeSponsor}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}
