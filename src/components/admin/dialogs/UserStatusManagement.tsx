
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

interface UserStatusManagementProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
}

export function UserStatusManagement({ 
  user, 
  open, 
  onOpenChange, 
  onUserUpdated 
}: UserStatusManagementProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [blockReason, setBlockReason] = useState(user?.block_reason || "");

  const isBlocked = user?.blocked || false;

  const handleStatusChange = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Update profile status in public.profiles table
      const { error } = await supabase
        .from("profiles")
        .update({
          blocked: !isBlocked,
          block_reason: !isBlocked ? blockReason : null,
          block_date: !isBlocked ? new Date().toISOString() : null
        })
        .eq("id", user.id);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: !isBlocked 
          ? "Usuário bloqueado com sucesso" 
          : "Usuário desbloqueado com sucesso",
      });
      
      onUserUpdated();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar status do usuário",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isBlocked ? "Desbloquear Usuário" : "Bloquear Usuário"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          {!isBlocked && (
            <>
              <p className="text-sm text-gray-500">
                Informe o motivo do bloqueio:
              </p>
              <Textarea
                placeholder="Motivo do bloqueio"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="min-h-[100px]"
              />
            </>
          )}

          {isBlocked && (
            <p className="text-sm text-gray-500">
              Tem certeza que deseja desbloquear este usuário?
            </p>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant={isBlocked ? "default" : "destructive"}
            onClick={handleStatusChange}
            disabled={isLoading || (!isBlocked && !blockReason)}
            className="gap-2"
          >
            {isBlocked ? (
              <>
                <CheckIcon className="h-4 w-4" />
                {isLoading ? "Desbloqueando..." : "Desbloquear"}
              </>
            ) : (
              <>
                <Cross1Icon className="h-4 w-4" />
                {isLoading ? "Bloqueando..." : "Bloquear"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
