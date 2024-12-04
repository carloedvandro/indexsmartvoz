import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProductList } from "@/components/store/ProductList";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/store/public/LoadingState";
import { StoreNotFound } from "@/components/store/public/StoreNotFound";
import { StoreHeader } from "@/components/store/public/StoreHeader";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  currency: string;
  order: number;
};

type StoreOwner = {
  id: string;
  full_name: string;
  custom_id: string;
};

export default function PublicStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeOwner, setStoreOwner] = useState<StoreOwner | null>(null);
  const { storeUrl } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const loadStore = async () => {
      if (!storeUrl) return;

      try {
        // Buscar o dono da loja
        const { data: owner, error: ownerError } = await supabase
          .from("profiles")
          .select("id, full_name, custom_id")
          .or(`store_url.eq.${storeUrl},custom_id.eq.${storeUrl}`)
          .single();

        if (ownerError || !owner) {
          toast({
            title: "Erro",
            description: "Loja não encontrada",
            variant: "destructive",
          });
          return;
        }

        setStoreOwner(owner);

        // Buscar os produtos
        const { data: productsData, error: productsError } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", owner.id)
          .order("order", { ascending: true });

        if (productsError) throw productsError;

        setProducts(productsData || []);
      } catch (error) {
        console.error("Erro ao carregar a loja:", error);
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
  }, [storeUrl, toast]);

  const handleBuyClick = () => {
    if (!storeOwner?.custom_id) {
      toast({
        title: "Erro",
        description: "Não foi possível processar a compra",
        variant: "destructive",
      });
      return;
    }

    window.location.href = `https://ytech.lovable.app/client/register?sponsor=${storeOwner.custom_id}`;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!storeOwner) {
    return <StoreNotFound />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <StoreHeader ownerName={storeOwner.full_name} />

      <ProductList
        products={products}
        isLoading={isLoading}
        selectedProduct={null}
        setSelectedProduct={() => {}}
        onSubmit={() => {}}
        onDelete={() => {}}
        isManager={false}
        onBuy={handleBuyClick}
      />
    </div>
  );
}