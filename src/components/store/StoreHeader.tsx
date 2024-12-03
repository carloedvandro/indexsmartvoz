import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

interface StoreHeaderProps {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  selectedProduct: any;
}

export function StoreHeader({ isLoading, onSubmit, selectedProduct }: StoreHeaderProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: profile } = useProfile();
  
  const storeUrl = profile?.store_url 
    ? `${window.location.origin}/store/${profile.store_url}`
    : null;

  const handleCopyLink = async () => {
    if (!storeUrl) return;
    
    try {
      await navigator.clipboard.writeText(storeUrl);
      toast({
        title: "Link copiado!",
        description: "O link da sua loja foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Minha Loja</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <ProductForm
            selectedProduct={selectedProduct}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </Dialog>
      </div>

      {storeUrl ? (
        <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Link da sua loja:</p>
            <p className="text-sm text-muted-foreground break-all">{storeUrl}</p>
          </div>
          <Button variant="outline" size="icon" onClick={handleCopyLink}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Configure uma URL personalizada para sua loja nas configurações do seu perfil.
          </p>
        </div>
      )}
    </div>
  );
}