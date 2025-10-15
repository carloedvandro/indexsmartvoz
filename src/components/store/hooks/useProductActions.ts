
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./useStoreProducts";

export function useProductActions(loadProducts: () => Promise<void>) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    try {
      setIsLoading(true);
      
      let imageUrl = selectedProduct?.image_url || null;
      const imageFile = (formData.get("image") as File);
      if (imageFile?.size > 0) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Get the current max order for new products
      let order = selectedProduct?.order;
      if (!order) {
        const { data: maxOrderProduct } = await supabase
          .from("store_products")
          .select("order")
          .eq("user_id", user.id)
          .order("order", { ascending: false })
          .limit(1);
        
        order = maxOrderProduct && maxOrderProduct.length > 0 
          ? (maxOrderProduct[0].order + 1) 
          : 1;
      }

      const productData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        image_url: imageUrl,
        user_id: user.id,
        currency: "BRL",
        order: order,
        plan_id: (formData.get("plan_id") as string) || null
      };

      if (selectedProduct) {
        const { error } = await supabase
          .from("store_products")
          .update(productData)
          .eq("id", selectedProduct.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("store_products")
          .insert([productData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }

      form.reset();
      setSelectedProduct(null);
      loadProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("store_products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return {
    selectedProduct,
    setSelectedProduct,
    isLoading,
    handleSubmit,
    handleDelete
  };
}
