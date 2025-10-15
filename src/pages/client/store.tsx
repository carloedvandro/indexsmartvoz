
import { useEffect, useState } from "react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { ProductList } from "@/components/store/ProductList";
import { PlansSection } from "@/components/store/PlansSection";
import { ExampleProducts } from "@/components/store/ExampleProducts";
import { useStoreProducts } from "@/components/store/hooks/useStoreProducts";
import { useProductActions } from "@/components/store/hooks/useProductActions";
import { useSession } from "@/hooks/useSession";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

export default function Store() {
  const { getSession } = useSession();
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const { products, isLoading, loadProducts } = useStoreProducts();
  const { 
    selectedProduct, 
    setSelectedProduct, 
    isLoading: isActionLoading, 
    handleSubmit, 
    handleDelete 
  } = useProductActions(loadProducts);

  const isManager = profile?.role === 'admin';
  const sponsorId = searchParams.get('sponsor');

  useEffect(() => {
    if (sponsorId) {
      navigate(`/client/register?sponsor=${sponsorId}`);
      return;
    }

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
  }, [sponsorId, navigate]);

  if (!isSessionLoaded && !sponsorId) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10 container mx-auto p-4 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <StoreHeader 
              isLoading={isActionLoading}
              onSubmit={handleSubmit}
              selectedProduct={selectedProduct}
              isManager={isManager}
            />
          </div>
        </div>

        {/* Plans Section */}
        <PlansSection />

        {/* "Produtos" heading removed */}
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
