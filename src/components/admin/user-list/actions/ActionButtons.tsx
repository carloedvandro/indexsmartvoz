
import { Button } from "@/components/ui/button";
import { UserCheck, Edit, Info, Mail, Lock, LockOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  user: any;
  isUnlocked: boolean;
  onEdit: (user: any) => void;
  onInfoClick: () => void;
  onToggleLock: () => void;
  onPlanClick: () => void;
}

export const ActionButtons = ({ 
  user, 
  isUnlocked, 
  onEdit, 
  onInfoClick, 
  onToggleLock,
  onPlanClick
}: ActionButtonsProps) => {
  return (
    <>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0"
        onClick={onPlanClick}
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-8 w-8 p-0"
      >
        <UserCheck className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={() => onEdit(user)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={onInfoClick}
      >
        <Info className="h-4 w-4" />
      </Button>
      
      <Button 
        size="sm" 
        variant="default" 
        className={`${isUnlocked ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"} h-8 w-8 p-0`}
        onClick={onToggleLock}
      >
        {isUnlocked ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
      </Button>
    </>
  );
};
