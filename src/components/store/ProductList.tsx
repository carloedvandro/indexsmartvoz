import { ProductCard } from "./ProductCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  currency: string;
  order: number;
};

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  onDelete: (id: string) => void;
  isManager?: boolean;
  onBuy?: () => void;
}

export function ProductList({ 
  products, 
  isLoading, 
  onSubmit, 
  selectedProduct, 
  setSelectedProduct, 
  onDelete,
  isManager = false,
  onBuy,
}: ProductListProps) {
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {products.map((product) => (
        <Dialog key={product.id}>
          <DialogTrigger asChild>
            <div className="h-full">
              <ProductCard
                product={product}
                onEdit={() => setSelectedProduct(product)}
                onDelete={() => onDelete(product.id)}
                isPublic={!isManager}
                onBuy={onBuy}
              />
            </div>
          </DialogTrigger>
          {isManager && (
            <ProductForm
              selectedProduct={selectedProduct}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          )}
        </Dialog>
      ))}
    </div>
  );
}