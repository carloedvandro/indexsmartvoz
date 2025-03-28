
import { Button } from "@/components/ui/button";
import { Eye, Users, Edit, Info, Lock, LockOpen, ArrowRightToLine } from "lucide-react";
import { useState } from "react";
import { PlanDetailsDialog } from "./PlanDetailsDialog";

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
  const [isPlanDetailsOpen, setIsPlanDetailsOpen] = useState(false);

  return (
    <>
      {/* Square blue button with eye icon */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-12 w-12 p-0 rounded-md"
        disabled={!isUnlocked}
      >
        <Eye className="h-5 w-5" />
      </Button>

      {/* Square blue button with users icon */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-12 w-12 p-0 rounded-md"
        disabled={!isUnlocked}
      >
        <Users className="h-5 w-5" />
      </Button>

      {/* Edit button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={() => onEdit(user)}
        disabled={!isUnlocked}
      >
        <Edit className="h-4 w-4" />
      </Button>

      {/* Info button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={onInfoClick}
        disabled={!isUnlocked}
      >
        <Info className="h-4 w-4" />
      </Button>
      
      {/* Lock/Unlock button */}
      <Button 
        size="sm" 
        variant="default" 
        className={`${isUnlocked ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"} h-8 w-8 p-0`}
        onClick={onToggleLock}
      >
        {isUnlocked ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
      </Button>

      {/* Plan details button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0"
        onClick={() => setIsPlanDetailsOpen(true)}
      >
        <ArrowRightToLine className="h-4 w-4" />
      </Button>

      <PlanDetailsDialog 
        isOpen={isPlanDetailsOpen} 
        onOpenChange={setIsPlanDetailsOpen}
        user={user}
      />
    </>
  );
};
