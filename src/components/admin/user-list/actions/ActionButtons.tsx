
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, Edit, Info, Lock, LockOpen, ArrowRightToLine } from "lucide-react";
import Image from "@/components/ui/image";

interface ActionButtonsProps {
  user: any;
  isUnlocked: boolean;
  onEdit: (user: any) => void;
  onInfoClick: () => void;
  onToggleLock: () => void;
}

export const ActionButtons = ({ 
  user, 
  isUnlocked, 
  onEdit, 
  onInfoClick, 
  onToggleLock 
}: ActionButtonsProps) => {
  return (
    <>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        disabled={!isUnlocked}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-8 w-8 p-0"
        disabled={!isUnlocked}
      >
        <UserCheck className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={() => onEdit(user)}
        disabled={!isUnlocked}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={onInfoClick}
        disabled={!isUnlocked}
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
      <Button 
        size="sm" 
        variant="default" 
        className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0"
        disabled={!isUnlocked}
      >
        <ArrowRightToLine className="h-4 w-4" />
      </Button>
    </>
  );
};
