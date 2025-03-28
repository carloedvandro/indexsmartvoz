
import { Button } from "@/components/ui/button";
import { Edit, Lock, Unlock, Info, Trash2, Network } from "lucide-react";
import { useState } from "react";

interface ActionButtonsProps {
  user: any;
  isUnlocked: boolean;
  onEdit: (user: any) => void;
  onInfoClick: () => void;
  onToggleLock: () => void;
  onDeleteClick: () => void;
}

export const ActionButtons = ({ 
  user, 
  isUnlocked, 
  onEdit,
  onInfoClick,
  onToggleLock,
  onDeleteClick
}: ActionButtonsProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const buttonClass = "h-8 w-8 p-0";

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClass}
        onClick={() => onEdit(user)}
        title="Editar usuário"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClass}
        onClick={onInfoClick}
        title="Informações de pagamento"
      >
        <Info className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClass}
        onClick={onToggleLock}
        title={isUnlocked ? "Bloquear usuário" : "Desbloquear usuário"}
      >
        {isUnlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClass}
        onClick={onDeleteClick}
        title="Excluir usuário"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClass}
        title="Rede"
      >
        <Network className="h-4 w-4" />
      </Button>
    </>
  );
};
