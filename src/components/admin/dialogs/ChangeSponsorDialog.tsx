
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .ilike("full_name", `%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao buscar usuários",
        variant: "destructive",
      });
    }
  };

  const handleSelectSponsor = (sponsor: any) => {
    setSelectedSponsor(sponsor);
    setSearchResults([]);
    setSearchTerm(sponsor.full_name);
  };

  const handleChangeSponsor = async () => {
    if (!selectedSponsor) {
      toast({
        title: "Erro",
        description: "Selecione um novo patrocinador",
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
        new_sponsor_id: selectedSponsor.id
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
            <Label htmlFor="new-sponsor">Buscar Novo Patrocinador</Label>
            <div className="flex gap-2">
              <Input
                id="new-sponsor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do novo patrocinador"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-2 border rounded-md">
                {searchResults.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="p-2 hover:bg-accent cursor-pointer flex flex-col border-b last:border-b-0"
                    onClick={() => handleSelectSponsor(sponsor)}
                  >
                    <span className="font-medium">{sponsor.full_name}</span>
                    <span className="text-sm text-muted-foreground">{sponsor.email}</span>
                  </div>
                ))}
              </div>
            )}
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
