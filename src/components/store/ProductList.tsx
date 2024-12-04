import { ProductCard } from "./ProductCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableProductCard } from "./SortableProductCard";

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
  onReorder: (products: Product[]) => void;
}

export function ProductList({ 
  products, 
  isLoading, 
  onSubmit, 
  selectedProduct, 
  setSelectedProduct, 
  onDelete,
  onReorder
}: ProductListProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((product) => product.id === active.id);
      const newIndex = products.findIndex((product) => product.id === over.id);
      
      const newProducts = arrayMove(products, oldIndex, newIndex).map((product, index) => ({
        ...product,
        order: index + 1
      }));
      
      onReorder(newProducts);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {products.map((product) => (
            <Dialog key={product.id}>
              <DialogTrigger asChild>
                <div className="h-full">
                  <SortableProductCard
                    product={product}
                    onEdit={() => setSelectedProduct(product)}
                    onDelete={onDelete}
                  />
                </div>
              </DialogTrigger>
              <ProductForm
                selectedProduct={selectedProduct}
                isLoading={isLoading}
                onSubmit={onSubmit}
              />
            </Dialog>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}