
import { Button } from "@/components/ui/button";
import { DeleteUserConfirmation } from "./DeleteUserConfirmation";

interface UserFormActionsProps {
  userId?: string;
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function UserFormActions({ 
  userId, 
  isLoading, 
  isDeleting, 
  onDelete, 
  onCancel 
}: UserFormActionsProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2">
        {userId && (
          <DeleteUserConfirmation
            isDeleting={isDeleting}
            onDelete={onDelete}
          />
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
    </div>
  );
}

