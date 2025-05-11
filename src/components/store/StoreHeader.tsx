
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Copy, Settings } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";

interface StoreHeaderProps {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  selectedProduct: any;
  isManager: boolean;
}

export function StoreHeader({ isLoading, onSubmit, selectedProduct, isManager }: StoreHeaderProps) {
  const { toast } = useToast();
  const { data: profile } = useProfile();
  
  const storeUrl = profile?.store_url || profile?.custom_id 
    ? `/store/${profile?.store_url || profile?.custom_id}`
    : null;

  const handleCopyLink = async () => {
    if (!storeUrl) return;
    
    try {
      const fullUrl = `${window.location.origin}${storeUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copiado!",
        description: "O link da sua loja foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar link",
        description: "Não foi possível copiar o link da loja.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Minha Loja</h2>
        <div className="flex gap-2">
          <Link to="/client/profile">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
          {/* "Adicionar Produto" button removed */}
        </div>
      </div>

      {!storeUrl ? (
        <p className="text-sm text-muted-foreground">
          Configure um ID personalizado nas configurações do seu perfil para gerar
          o link da sua loja.
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-sm">
            Link da sua loja:{" "}
            <a
              href={`${window.location.origin}${storeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {window.location.origin}
              {storeUrl}
            </a>
          </p>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={handleCopyLink}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
