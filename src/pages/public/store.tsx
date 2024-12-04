import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const fetchStoreOwner = async (url: string): Promise<StoreOwner | null> => {
    console.log("Buscando dono da loja com URL:", url);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, custom_id")
        .or(`store_url.eq."${url}",custom_id.eq."${url}"`)
        .single();

      if (error) {
        console.error("Erro ao buscar dono da loja:", error);
        throw error;
      }

      if (!data) {
        console.log("Loja não encontrada para URL:", url);
        toast({ 
          title: "Loja não encontrada", 
          description: "Não foi possível encontrar a loja especificada",
          variant: "destructive" 
        });
        return null;
      }

      console.log("Dono da loja encontrado:", data);
      return data as StoreOwner;
    } catch (err) {
      console.error("Erro ao buscar dono da loja:", err);
      toast({ 
        title: "Erro", 
        description: "Não foi possível carregar a loja", 
        variant: "destructive" 
      });
      return null;
    }
  };

  const fetchProducts = async (ownerId: string): Promise<Product[]> => {
    console.log("Buscando produtos para o dono:", ownerId);
    try {
      const { data, error } = await supabase
        .from("store_products")
        .select("*")
        .eq("user_id", ownerId)
        .order("order", { ascending: true });

      if (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
      }

      console.log("Produtos carregados:", data?.length || 0, "produtos");
      return data || [];
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      toast({ 
        title: "Erro", 
        description: "Não foi possível carregar os produtos", 
        variant: "destructive" 
      });
      return [];
    }
  };

  useEffect(() => {
    const loadStore = async () => {
      if (!storeUrl) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Iniciando carregamento da loja com URL:", storeUrl);
        
        const owner = await fetchStoreOwner(storeUrl);
        if (!owner) {
          setIsLoading(false);
          return;
        }

        setStoreOwner(owner);
        const storeProducts = await fetchProducts(owner.id);
        setProducts(storeProducts);
      } catch (error) {
        console.error("Erro ao carregar a loja:", error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao carregar a loja",
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
      console.error("Custom ID não encontrado para o dono da loja");
      toast({
        title: "Erro",
        description: "Não foi possível processar a compra",
        variant: "destructive",
      });
      return;
    }

    const registerUrl = `https://ytech.lovable.app/client/register?sponsor=${storeOwner.custom_id}`;
    console.log("Redirecionando para:", registerUrl);
    window.location.href = registerUrl;
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  if (!storeOwner) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div>Loja não encontrada</div>
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
        {products.length === 0 ? (
          <div className="text-center">Nenhum produto disponível no momento.</div>
        ) : (
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
        )}
      </div>
    </div>
  );
}