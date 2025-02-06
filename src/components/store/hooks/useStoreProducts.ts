
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
  const { data: profile } = useProfile();

  const loadProducts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Se for admin, carrega os produtos dele
      if (profile?.role === 'admin') {
        const { data, error } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", user.id)
          .order("order", { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } else {
        // Para outros usuários, carrega os produtos do admin
        const { data: adminData, error: adminError } = await supabase
          .from("profiles")
          .select("id")
          .eq("role", "admin")
          .single();

        if (adminError) throw adminError;

        const { data, error } = await supabase
          .from("store_products")
          .select("*")
          .eq("user_id", adminData.id)
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
