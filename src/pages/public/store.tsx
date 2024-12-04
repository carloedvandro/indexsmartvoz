import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/store/public/LoadingState";
import { StoreNotFound } from "@/components/store/public/StoreNotFound";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type StoreOwner = {
  id: string;
  full_name: string;
  custom_id: string;
};

export default function PublicStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [storeOwner, setStoreOwner] = useState<StoreOwner | null>(null);
  const { storeUrl } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const loadStore = async () => {
      if (!storeUrl) {
        console.log("No storeUrl provided");
        return;
      }

      try {
        console.log("Fetching store owner with storeUrl:", storeUrl);
        
        const { data: owner, error: ownerError } = await supabase
          .from("profiles")
          .select("id, full_name, custom_id")
          .or(`store_url.eq."${storeUrl}",custom_id.eq."${storeUrl}"`)
          .single();

        console.log("Query result:", { owner, ownerError });

        if (ownerError) {
          console.error("Error fetching store owner:", ownerError);
          toast({
            title: "Erro",
            description: "Loja não encontrada",
            variant: "destructive",
          });
          return;
        }

        if (!owner) {
          console.log("No owner found for storeUrl:", storeUrl);
          return;
        }

        console.log("Setting store owner:", owner);
        setStoreOwner(owner);
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
  }, [storeUrl, toast]);

  const registrationUrl = storeOwner?.custom_id 
    ? `https://ytech.lovable.app/client/register?sponsor=${storeOwner.custom_id}`
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationUrl);
    toast({
      title: "Link copiado!",
      description: "O link de indicação foi copiado para sua área de transferência.",
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!storeOwner) {
    return <StoreNotFound />;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Link de Indicação de {storeOwner.full_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Use o link abaixo para se cadastrar e fazer parte da nossa rede:
          </p>
          
          <div className="bg-muted p-4 rounded-lg break-all text-sm">
            {registrationUrl}
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleCopyLink}
              className="w-full max-w-xs"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar Link
            </Button>
            <Button 
              onClick={() => window.location.href = registrationUrl}
              className="w-full max-w-xs"
            >
              Cadastrar Agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
