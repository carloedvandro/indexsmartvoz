
import { Edit, Key, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActionButtonsProps {
  user: any;
  isUnlocked: boolean;
  onEdit: (user: any) => void;
  onInfoClick: () => void;
  onPlanClick: () => void;
  onToggleLock: () => void;
}

export const ActionButtons = ({ 
  user, 
  isUnlocked, 
  onEdit, 
  onInfoClick, 
  onPlanClick,
  onToggleLock 
}: ActionButtonsProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => onEdit(user)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onToggleLock}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Key className={`h-4 w-4 ${isUnlocked ? "text-green-500" : "text-gray-500"}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isUnlocked ? "Bloquear" : "Desbloquear"} edição</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onInfoClick}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Detalhes de pagamento</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onPlanClick}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Expiração do Plano</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
