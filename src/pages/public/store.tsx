import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/store/public/LoadingState";
import { StoreNotFound } from "@/components/store/public/StoreNotFound";
import { ProductList } from "@/components/store/ProductList";
import { StoreHeader } from "@/components/store/public/StoreHeader";
import { useToast } from "@/hooks/use-toast";
import { useStoreProducts } from "@/components/store/hooks/useStoreProducts";
import { ScrollArea } from "@/components/ui/scroll-area";

type StoreOwner = {
  id: string;
  full_name: string;
  custom_id: string | null;
};

export default function PublicStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [storeOwner, setStoreOwner] = useState<StoreOwner | null>(null);
  const { storeUrl } = useParams();
  const { toast } = useToast();
  const { products, isLoading: productsLoading, loadProducts } = useStoreProducts();

  useEffect(() => {
    const loadStore = async () => {
      if (!storeUrl) {
        console.log("No storeUrl provided");
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching store owner with storeUrl:", storeUrl);
        
        // First try to find by store_url
        let { data: storeOwnerData, error: storeUrlError } = await supabase
          .from("profiles")
          .select("id, full_name, custom_id")
          .eq("store_url", storeUrl)
          .maybeSingle();

        // If not found by store_url, try custom_id
        if (!storeOwnerData && !storeUrlError) {
          console.log("Store not found by store_url, trying custom_id");
          const { data: customIdData, error: customIdError } = await supabase
            .from("profiles")
            .select("id, full_name, custom_id")
            .eq("custom_id", storeUrl)
            .maybeSingle();

          if (customIdError) {
            console.error("Error fetching by custom_id:", customIdError);
            throw customIdError;
          }

          storeOwnerData = customIdData;
        } else if (storeUrlError) {
          console.error("Error fetching by store_url:", storeUrlError);
          throw storeUrlError;
        }

        if (!storeOwnerData) {
          console.log("No owner found for storeUrl:", storeUrl);
          setStoreOwner(null);
          setIsLoading(false);
          return;
        }

        console.log("Setting store owner:", storeOwnerData);
        setStoreOwner(storeOwnerData);
        await loadProducts();
      } catch (error) {
        console.error("Error loading store:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a loja",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStore();
  }, [storeUrl, toast, loadProducts]);

  if (isLoading || productsLoading) {
    return <LoadingState />;
  }

  if (!storeOwner) {
    return <StoreNotFound />;
  }

  const handleBuy = () => {
    toast({
      title: "Em breve!",
      description: "A funcionalidade de compra estará disponível em breve.",
    });
  };

  return (
    <ScrollArea className="h-screen">
      <div className="container mx-auto p-4">
        <div className="space-y-8">
          <StoreHeader ownerName={storeOwner.full_name} />
          
          <div className="grid gap-8">
            <ProductList
              products={products}
              isLoading={productsLoading}
              onSubmit={() => {}}
              selectedProduct={null}
              setSelectedProduct={() => {}}
              onDelete={() => {}}
              isManager={false}
              onBuy={handleBuy}
            />
          </div>

          <div className="mt-8 p-6 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Link de Indicação</h2>
            <p className="text-muted-foreground mb-4">
              Use o link abaixo para se cadastrar e fazer parte da nossa rede:
            </p>
            <div className="bg-muted p-4 rounded-lg break-all text-sm">
              {`https://ytech.lovable.app/client/register?sponsor=${storeOwner.custom_id || storeOwner.id}`}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}