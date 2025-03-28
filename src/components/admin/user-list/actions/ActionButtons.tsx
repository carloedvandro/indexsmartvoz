
import { Button } from "@/components/ui/button";
import { Eye, Network, Edit, Info, Lock, LockOpen, ArrowRightToLine, Trash2 } from "lucide-react";
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
      {/* Eye button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-9 w-9 p-0 rounded-md"
        disabled={!isUnlocked}
      >
        <Eye className="h-4 w-4" />
      </Button>

      {/* Network button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-blue-500 hover:bg-blue-600 h-9 w-9 p-0 rounded-md"
        disabled={!isUnlocked}
      >
        <Network className="h-4 w-4" />
      </Button>

      {/* Edit button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-9 w-9 p-0 rounded-md"
        onClick={() => onEdit(user)}
        disabled={!isUnlocked}
      >
        <Edit className="h-4 w-4" />
      </Button>

      {/* Info button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-9 w-9 p-0 rounded-md"
        onClick={onInfoClick}
        disabled={!isUnlocked}
      >
        <Info className="h-4 w-4" />
      </Button>
      
      {/* Lock/Unlock button */}
      <Button 
        size="sm" 
        variant="default" 
        className={`bg-purple-600 hover:bg-purple-700 h-9 w-9 p-0 rounded-md`}
        onClick={onToggleLock}
      >
        {isUnlocked ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
      </Button>

      {/* Plan details button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-green-500 hover:bg-green-600 h-9 w-9 p-0 rounded-md"
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
