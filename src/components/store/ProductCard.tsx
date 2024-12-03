import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isExample?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, isExample }: ProductCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 mt-auto">
        {isExample ? (
          <p className="text-sm text-gray-500 italic">Example Product</p>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(product)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}