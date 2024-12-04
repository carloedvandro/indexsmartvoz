import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProductList } from "@/components/store/ProductList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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
  const navigate = useNavigate();

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
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (!storeOwner) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg mb-4">Loja não encontrada</p>
              <Button onClick={() => navigate(-1)}>Voltar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Loja de {storeOwner.full_name}</h1>
      </div>

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