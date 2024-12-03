import { useEffect } from "react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { ProductList } from "@/components/store/ProductList";
import { ExampleProducts } from "@/components/store/ExampleProducts";
import { useStoreProducts } from "@/components/store/hooks/useStoreProducts";
import { useProductActions } from "@/components/store/hooks/useProductActions";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Store() {
  const { products, isLoading, loadProducts } = useStoreProducts();
  const { 
    selectedProduct, 
    setSelectedProduct, 
    isLoading: isActionLoading, 
    handleSubmit, 
    handleDelete 
  } = useProductActions(loadProducts);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-4 space-y-6">
        <StoreHeader 
          isLoading={isActionLoading}
          onSubmit={handleSubmit}
          selectedProduct={selectedProduct}
        />

        {products.length > 0 ? (
          <ProductList
            products={products}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            onDelete={handleDelete}
          />
        ) : (
          <ExampleProducts
            setSelectedProduct={setSelectedProduct}
            onDelete={handleDelete}
          />
        )}
      </div>
    </ScrollArea>
  );
}