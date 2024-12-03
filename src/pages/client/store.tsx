import { useEffect } from "react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { ProductList } from "@/components/store/ProductList";
import { ExampleProducts } from "@/components/store/ExampleProducts";
import { useStoreProducts } from "@/components/store/hooks/useStoreProducts";
import { useProductActions } from "@/components/store/hooks/useProductActions";

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
    <div className="h-screen w-full overflow-y-auto">
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
    </div>
  );
}