import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    const loadStore = async () => {
      try {
        console.log("Iniciando carregamento da loja com URL:", storeUrl);
        
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, custom_id")
          .or(`store_url.eq.${storeUrl},custom_id.eq.${storeUrl}`)
          .single();

        if (profileError) {
          console.error("Erro ao buscar perfil:", profileError);
          throw profileError;
        }

        if (!profileData) {
          console.error("Loja não encontrada para URL:", storeUrl);
          throw new Error("Store not found");
        }

        console.log("Perfil encontrado:", profileData);
        setStoreOwner(profileData);

        const { data: productsData, error: productsError } = await supabase
          .from("store_products")
          .select("*")
          .order("order", { ascending: true });

        if (productsError) {
          console.error("Erro ao buscar produtos:", productsError);
          throw productsError;
        }

        console.log("Produtos carregados:", productsData?.length || 0);
        setProducts(productsData || []);
      } catch (error) {
        console.error("Erro ao carregar a loja:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (storeUrl) {
      loadStore();
    }
  }, [storeUrl]);

  const handleBuyClick = () => {
    if (storeOwner?.custom_id) {
      console.log("Redirecionando para registro com patrocinador:", storeOwner.custom_id);
      const registerUrl = `https://ytech.lovable.app/client/register?sponsor=${storeOwner.custom_id}`;
      console.log("URL de redirecionamento:", registerUrl);
      window.location.href = registerUrl;
    } else {
      console.error("Custom ID não encontrado para o dono da loja");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full overflow-y-auto">
        <div className="container mx-auto p-4">Carregando...</div>
      </div>
    );
  }

  if (!storeOwner) {
    return (
      <div className="h-screen w-full overflow-y-auto">
        <div className="container mx-auto p-4">Loja não encontrada</div>
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
            onClick={() => window.history.back()}
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