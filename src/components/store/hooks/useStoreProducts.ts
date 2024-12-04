import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  currency: string;
  order: number;
};

export function useStoreProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { profile } = useProfile();

  const loadProducts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Se for o gerente, carrega os produtos dele
      if (profile?.email === 'yrwentechnology@gmail.com') {
        const { data, error } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", user.id)
          .order("order", { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } else {
        // Para outros usuários, carrega os produtos do gerente
        const { data: managerData, error: managerError } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", "yrwentechnology@gmail.com")
          .single();

        if (managerError) throw managerError;

        const { data, error } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", managerData.id)
          .order("order", { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    loadProducts,
  };
}