import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductForm } from "@/components/store/ProductForm";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

const placeholderProducts = [
  {
    id: "example-1",
    name: "Professional Development Course",
    description: "Comprehensive online course covering the latest industry trends and best practices.",
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: "example-2",
    name: "Business Consultation Package",
    description: "One-on-one consultation sessions with industry experts to grow your business.",
    price: 1499.99,
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
];

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("store_products")
        .select("*")
        .order("created_at", { ascending: false });

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

  useEffect(() => {
    loadProducts();
  }, []);

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

      const productData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        image_url: imageUrl,
        user_id: user.id, // Add user_id to the product data
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Store</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <ProductForm
            selectedProduct={selectedProduct}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setSelectedProduct}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No products yet. Here are some examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setSelectedProduct}
                onDelete={handleDelete}
                isExample
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}