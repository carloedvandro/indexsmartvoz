import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/store/ProductCard";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  currency: string;
};

export default function PublicStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeOwner, setStoreOwner] = useState<{ full_name: string } | null>(null);
  const { storeUrl } = useParams();

  useEffect(() => {
    const loadStore = async () => {
      try {
        // First get the store owner
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name")
          .eq("store_url", storeUrl)
          .single();

        if (profileError) throw profileError;
        if (!profileData) throw new Error("Store not found");

        setStoreOwner(profileData);

        // Then get their products
        const { data: productsData, error: productsError } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", profileData.id);

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

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!storeOwner) {
    return <div className="container mx-auto p-4">Store not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Loja de {storeOwner.full_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => {}}
            onDelete={() => {}}
            isPublic
          />
        ))}
      </div>
    </div>
  );
}