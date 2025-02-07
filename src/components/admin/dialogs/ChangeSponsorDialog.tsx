
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface ChangeSponsorDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ChangeSponsorDialog({ 
  user, 
  open, 
  onOpenChange,
  onSuccess 
}: ChangeSponsorDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newSponsorId, setNewSponsorId] = useState("");

  const handleChangeSponsor = async () => {
    if (!newSponsorId) {
      toast({
        title: "Erro",
        description: "Digite o ID do novo patrocinador",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        throw new Error("Usuário não autenticado");
      }

      const { error } = await supabase.rpc('move_user_and_network', {
        admin_user_id: session.user.id,
        user_to_move_id: user.id,
        new_sponsor_id: newSponsorId
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Patrocinador alterado com sucesso",
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao alterar patrocinador",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar Patrocinador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-sponsor">Patrocinador Atual</Label>
            <Input
              id="current-sponsor"
              value={user?.sponsor?.full_name || "Sem patrocinador"}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-sponsor">ID do Novo Patrocinador</Label>
            <Input
              id="new-sponsor"
              value={newSponsorId}
              onChange={(e) => setNewSponsorId(e.target.value)}
              placeholder="Digite o ID do novo patrocinador"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleChangeSponsor}
            disabled={isLoading}
          >
            {isLoading ? "Alterando..." : "Alterar Patrocinador"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
