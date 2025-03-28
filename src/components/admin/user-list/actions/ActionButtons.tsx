
import { Button } from "@/components/ui/button";
import { Eye, Network, Edit, Info, Lock, LockOpen, ArrowRightToLine, Trash2, Settings } from "lucide-react";
import { useState } from "react";
import { PlanDetailsDialog } from "./PlanDetailsDialog";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  user: any;
  isUnlocked: boolean;
  onEdit: (user: any) => void;
  onInfoClick: () => void;
  onToggleLock: () => void;
  onDelete?: () => void;
}

export const ActionButtons = ({ 
  user, 
  isUnlocked, 
  onEdit, 
  onInfoClick, 
  onToggleLock,
  onDelete
}: ActionButtonsProps) => {
  const [isPlanDetailsOpen, setIsPlanDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNetworkClick = () => {
    if (user && user.id) {
      navigate(`/admin/network?userId=${user.id}`);
    }
  };

  const handleNetworkConfigClick = () => {
    if (user && user.id) {
      navigate(`/admin/network-config?userId=${user.id}`);
    }
  };

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
        onClick={handleNetworkClick}
      >
        <Network className="h-4 w-4" />
      </Button>
      
      {/* Network Config button */}
      <Button 
        size="sm" 
        variant="default" 
        className="bg-purple-500 hover:bg-purple-600 h-9 w-9 p-0 rounded-md"
        onClick={handleNetworkConfigClick}
      >
        <Settings className="h-4 w-4" />
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
      
      {/* Delete button */}
      {onDelete && (
        <Button 
          size="sm" 
          variant="default" 
          className="bg-red-500 hover:bg-red-600 h-9 w-9 p-0 rounded-md"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      <PlanDetailsDialog 
        isOpen={isPlanDetailsOpen} 
        onOpenChange={setIsPlanDetailsOpen}
        user={user}
      />
    </>
  );
};
