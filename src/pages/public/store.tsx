
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/store/public/LoadingState";
import { StoreNotFound } from "@/components/store/public/StoreNotFound";
import { ProductList } from "@/components/store/ProductList";
import { StoreHeader } from "@/components/store/public/StoreHeader";
import { useToast } from "@/hooks/use-toast";
import { useStoreProducts } from "@/components/store/hooks/useStoreProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, ArrowRight } from "lucide-react";

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
  const navigate = useNavigate();
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
        
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, custom_id")
          .or(`store_url.eq.${storeUrl},custom_id.eq.${storeUrl}`)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching store owner:", error);
          throw error;
        }

        if (!data) {
          console.log("No store owner found for:", storeUrl);
          setStoreOwner(null);
          setIsLoading(false);
          return;
        }

        // Se encontrou o dono da loja e tem custom_id, redireciona direto para o registro
        if (data.custom_id) {
          navigate(`/client/register?sponsor=${data.custom_id}`);
          return;
        }

        setStoreOwner(data);
        await loadProducts();
      } catch (error) {
        console.error("Error loading store:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a loja",
          variant: "destructive",
        });
        setStoreOwner(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadStore();
  }, [storeUrl, toast, loadProducts, navigate]);

  const handleCopyReferralLink = async () => {
    if (!storeOwner?.custom_id) return;
    
    try {
      const referralLink = new URL(`/client/register?sponsor=${storeOwner.custom_id}`, window.location.origin).toString();
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link copiado!",
        description: "O link de indicação foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link de indicação.",
        variant: "destructive",
      });
    }
  };

  const handleBuy = (referralLink: string) => {
    window.location.href = referralLink;
  };

  const handleGoToReferralLink = () => {
    if (!storeOwner?.custom_id) return;
    const referralLink = new URL(`/client/register?sponsor=${storeOwner.custom_id}`, window.location.origin).toString();
    window.location.href = referralLink;
  };

  if (isLoading || productsLoading) {
    return <LoadingState />;
  }

  if (!storeOwner) {
    return <StoreNotFound />;
  }

  const referralLink = storeOwner.custom_id 
    ? new URL(`/client/register?sponsor=${storeOwner.custom_id}`, window.location.origin).toString()
    : "";

  return (
    <div className="relative min-h-screen">
      <ScrollArea className="h-screen">
        <div className="relative z-10 container mx-auto p-4">
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
                storeOwnerCustomId={storeOwner.custom_id || undefined}
              />
            </div>

            <div className="mt-8 p-6 bg-card rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Link de Indicação</h2>
              <p className="text-muted-foreground mb-4">
                Use o link abaixo para se cadastrar e fazer parte da nossa rede:
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href={referralLink}
                  className="flex-1 bg-muted p-4 rounded-lg break-all text-sm hover:bg-muted/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {referralLink}
                </a>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyReferralLink}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleGoToReferralLink}
                    className="shrink-0 w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                  >
                    Cadastrar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
