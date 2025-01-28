import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    currency: string;
  };
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
  onBuy?: (referralLink: string) => void;
  isPublic?: boolean;
  isExample?: boolean;
  storeOwnerCustomId?: string;
}

export function ProductCard({ 
  product, 
  onEdit, 
  onDelete, 
  onBuy, 
  isPublic, 
  isExample,
  storeOwnerCustomId 
}: ProductCardProps) {
  const { toast } = useToast();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await onDelete(product.id);
        toast({
          title: "Sucesso",
          description: "Produto excluído com sucesso",
        });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o produto",
          variant: "destructive",
        });
      }
    }
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onBuy && storeOwnerCustomId) {
      const referralLink = `${window.location.origin}/client/register?sponsor=${storeOwnerCustomId}`;
      onBuy(referralLink);
    }
  };

  return (
    <Card className="overflow-hidden">
      {product.image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {product.description}
        </p>
        <p className="text-2xl font-bold">
          {formatCurrency(product.price, product.currency)}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isPublic ? (
          <Button 
            onClick={handleBuyClick}
            className="w-full"
            type="button"
          >
            Comprar
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={() => onEdit(product)}>
              Editar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}