import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  currency: string;
  order: number;
};

export default function PublicStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeOwner, setStoreOwner] = useState<{ full_name: string, custom_id: string } | null>(null);
  const { storeUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStore = async () => {
      try {
        // Primeiro, obtemos o dono da loja pelo custom_id
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, custom_id")
          .eq("custom_id", storeUrl)
          .single();

        if (profileError) throw profileError;
        if (!profileData) throw new Error("Store not found");

        setStoreOwner(profileData);

        // Então, obtemos os produtos do gerente
        const { data: managerData, error: managerError } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", "yrwentechnology@gmail.com")
          .single();

        if (managerError) throw managerError;

        // Buscamos os produtos do gerente
        const { data: productsData, error: productsError } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", managerData.id)
          .order("order", { ascending: true });

        if (productsError) throw productsError;
        setProducts(productsData || []);
      } catch (error) {
        console.error("Error loading store:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStore();
  }, [storeUrl]);

  const handleBuyClick = () => {
    if (storeOwner?.custom_id) {
      navigate(`/register?sponsor=${storeOwner.custom_id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full overflow-y-auto">
        <div className="container mx-auto p-4">Loading...</div>
      </div>
    );
  }

  if (!storeOwner) {
    return (
      <div className="h-screen w-full overflow-y-auto">
        <div className="container mx-auto p-4">Store not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="container mx-auto p-4 pb-16">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Loja de {storeOwner.full_name}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => {}}
              onDelete={() => {}}
              onBuy={handleBuyClick}
              isPublic
            />
          ))}
        </div>
      </div>
    </div>
  );
}