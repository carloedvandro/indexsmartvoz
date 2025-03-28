
import { Button } from "@/components/ui/button";
import { Edit, Eye, Info, Key, Mail, Trash, UserCheck } from "lucide-react";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
}

export const UserActions = ({ user, onEdit }: UserActionsProps) => {
  return (
    <div className="flex space-x-1">
      <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
        <Eye className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-cyan-500 hover:bg-cyan-600 h-8 w-8 p-0">
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
      <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
        <Info className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-red-500 hover:bg-red-600 h-8 w-8 p-0">
        <Trash className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
        <Key className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0">
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
};
