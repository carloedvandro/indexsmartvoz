import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const loadProducts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("store_products")
        .select("*")
        .eq("user_id", user.id)
        .order("order", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
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

  const reorderProducts = async (reorderedProducts: Product[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Prepare updates with all required fields
      const updates = reorderedProducts.map((product) => ({
        id: product.id,
        order: product.order,
        name: product.name,
        price: product.price,
        user_id: user.id,
        description: product.description,
        image_url: product.image_url,
        currency: product.currency
      }));

      const { error } = await supabase
        .from("store_products")
        .upsert(updates, { onConflict: 'id' });

      if (error) throw error;

      setProducts(reorderedProducts);
      
      toast({
        title: "Success",
        description: "Product order updated successfully",
      });
    } catch (error) {
      console.error("Error reordering products:", error);
      toast({
        title: "Error",
        description: "Failed to update product order",
        variant: "destructive",
      });
    }
  };

  return {
    products,
    isLoading,
    loadProducts,
    reorderProducts,
  };
}