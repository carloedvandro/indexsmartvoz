
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserGroups } from "../hooks/useUserGroups";

interface UserGroupsManagerProps {
  userId: string | null;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function UserGroupsManager({ userId, value, onChange, onClose }: UserGroupsManagerProps) {
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [newGroup, setNewGroup] = useState("");
  const { toast } = useToast();
  const { fetchUserGroups, saveUserGroups } = useUserGroups();

  useEffect(() => {
    if (userId) {
      loadUserGroups(userId);
    } else {
      // For new users, initialize with empty groups
      setUserGroups([]);
    }
  }, [userId]);

  const loadUserGroups = async (userId: string) => {
    try {
      const groups = await fetchUserGroups(userId);
      setUserGroups(groups);
      onChange(groups.join(", "));
    } catch (error) {
      console.error("Error loading user groups:", error);
    }
  };

  const handleAddGroup = () => {
    if (!newGroup.trim()) return;
    
    if (!userGroups.includes(newGroup)) {
      const updatedGroups = [...userGroups, newGroup];
      setUserGroups(updatedGroups);
      onChange(updatedGroups.join(", "));
    }
    
    setNewGroup("");
  };

  const handleRemoveGroup = (groupToRemove: string) => {
    const updatedGroups = userGroups.filter(group => group !== groupToRemove);
    setUserGroups(updatedGroups);
    onChange(updatedGroups.join(", "));
  };

  const handleSave = async () => {
    if (userId) {
      try {
        await saveUserGroups(userId, userGroups);
        toast({
          title: "Sucesso",
          description: "Grupos do usuário salvos com sucesso",
        });
        onClose();
      } catch (error) {
        console.error("Error saving user groups:", error);
        toast({
          title: "Erro",
          description: "Não foi possível salvar os grupos do usuário",
          variant: "destructive",
        });
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-md">
      <h4 className="font-medium mb-2 flex items-center gap-1">
        <Users size={18} />
        Gerenciar Grupos
      </h4>
      
      <div className="flex mb-4">
        <Input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Nome do grupo"
          className="mr-2"
        />
        <Button
          type="button"
          onClick={handleAddGroup}
          variant="outline"
          className="border-[#5438a0] text-[#5438a0]"
        >
          <Plus size={18} />
        </Button>
      </div>
      
      {userGroups.length > 0 ? (
        <div className="space-y-2">
          {userGroups.map((group, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
              <span>{group}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveGroup(group)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Minus size={16} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Nenhum grupo adicionado</p>
      )}
      
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          onClick={onClose}
          className="bg-[#5438a0] hover:bg-[#4a3195]"
        >
          Concluído
        </Button>
      </div>
    </div>
  );
}
