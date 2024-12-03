import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon } from "lucide-react";
import { updateProfile } from "@/components/admin/UserFormUtils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface StoreUrlEditorProps {
  profileId: string;
  initialStoreUrl: string;
}

export const StoreUrlEditor = ({ profileId, initialStoreUrl }: StoreUrlEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [storeUrl, setStoreUrl] = useState(initialStoreUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSaveStoreUrl = async () => {
    try {
      setIsLoading(true);
      await updateProfile(profileId, { store_url: storeUrl });
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
      toast({
        title: "URL atualizada",
        description: "A URL da sua loja foi atualizada com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Ocorreu um erro ao atualizar a URL da loja",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4">
      <p className="text-sm text-muted-foreground mb-2 text-center">URL da Loja</p>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Input
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="minha-loja"
              className="flex-1"
            />
            <Button 
              size="sm" 
              onClick={handleSaveStoreUrl}
              disabled={isLoading}
            >
              Salvar
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setStoreUrl(initialStoreUrl);
                setIsEditing(false);
              }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <div className="flex-1 flex items-center justify-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {storeUrl || "Não configurado"}
              </span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};