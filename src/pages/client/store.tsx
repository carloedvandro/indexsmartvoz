import { useEffect, useState } from "react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { ProductList } from "@/components/store/ProductList";
import { ExampleProducts } from "@/components/store/ExampleProducts";
import { useStoreProducts } from "@/components/store/hooks/useStoreProducts";
import { useProductActions } from "@/components/store/hooks/useProductActions";
import { useSession } from "@/hooks/useSession";
import { useProfile } from "@/hooks/useProfile";

export default function Store() {
  const { getSession } = useSession();
  const { data: profile } = useProfile();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const { products, isLoading, loadProducts } = useStoreProducts();
  const { 
    selectedProduct, 
    setSelectedProduct, 
    isLoading: isActionLoading, 
    handleSubmit, 
    handleDelete 
  } = useProductActions(loadProducts);

  const isManager = profile?.email === 'yrwentechnology@gmail.com';

  useEffect(() => {
    const initializeStore = async () => {
      const session = await getSession();
      if (!session) {
        return;
      }
      
      setIsSessionLoaded(true);
      try {
        await loadProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    
    initializeStore();
  }, []);

  if (!isSessionLoaded) {
    return null;
  }

  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <StoreHeader 
          isLoading={isActionLoading}
          onSubmit={handleSubmit}
          selectedProduct={selectedProduct}
          isManager={isManager}
        />

        {products.length > 0 ? (
          <ProductList
            products={products}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            onDelete={handleDelete}
            isManager={isManager}
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