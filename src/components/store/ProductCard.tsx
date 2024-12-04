import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

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
  onBuy?: () => void;
  isPublic?: boolean;
  isExample?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, onBuy, isPublic, isExample }: ProductCardProps) {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onBuy) {
      console.log("Clique no botão comprar detectado");
      onBuy();
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
            <Button variant="destructive" onClick={() => onDelete(product.id)}>
              Excluir
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}