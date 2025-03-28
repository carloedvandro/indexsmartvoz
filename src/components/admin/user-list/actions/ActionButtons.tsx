
import { Button } from "@/components/ui/button";
import { Eye, Network, Edit, Info, Lock, LockOpen, ArrowRightToLine } from "lucide-react";
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
      {/* Square button with eye icon */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-10 w-10 p-0 rounded-md"
        disabled={!isUnlocked}
      >
        <Eye className="h-5 w-5" />
      </Button>

      {/* Square button with network icon */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-10 w-10 p-0 rounded-md"
        disabled={!isUnlocked}
      >
        <Network className="h-5 w-5" />
      </Button>

      {/* Edit button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0 rounded-md"
        onClick={() => onEdit(user)}
        disabled={!isUnlocked}
      >
        <Edit className="h-5 w-5" />
      </Button>

      {/* Info button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0 rounded-md"
        onClick={onInfoClick}
        disabled={!isUnlocked}
      >
        <Info className="h-5 w-5" />
      </Button>
      
      {/* Lock/Unlock button */}
      <Button 
        size="sm" 
        variant="default" 
        className={`${isUnlocked ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"} h-10 w-10 p-0 rounded-md`}
        onClick={onToggleLock}
      >
        {isUnlocked ? <LockOpen className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
      </Button>

      {/* Plan details button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-green-500 hover:bg-green-600 h-10 w-10 p-0 rounded-md"
        onClick={() => setIsPlanDetailsOpen(true)}
      >
        <ArrowRightToLine className="h-5 w-5" />
      </Button>

      <PlanDetailsDialog 
        isOpen={isPlanDetailsOpen} 
        onOpenChange={setIsPlanDetailsOpen}
        user={user}
      />
    </>
  );
};
