
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  active: boolean;
  order?: number;
}

export const useProductActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      setIsLoading(true);
      
      // Mock data since the store_products table doesn't exist yet
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Produto 1',
          description: 'Descrição do produto 1',
          price: 99.99,
          active: true,
          order: 1
        },
        {
          id: '2', 
          name: 'Produto 2',
          description: 'Descrição do produto 2',
          price: 149.99,
          active: true,
          order: 2
        }
      ];

      console.log('✅ Produtos carregados (mock):', mockProducts.length);
      return mockProducts;
    } catch (error) {
      console.error('❌ Erro ao buscar produtos:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar produtos",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock creation
      console.log('✅ Produto criado (mock):', productData.name);
      
      toast({
        title: "Sucesso",
        description: "Produto criado com sucesso",
      });
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao criar produto:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar produto",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock update
      console.log('✅ Produto atualizado (mock):', id);
      
      toast({
        title: "Sucesso", 
        description: "Produto atualizado com sucesso",
      });
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar produto",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock deletion
      console.log('✅ Produto deletado (mock):', id);
      
      toast({
        title: "Sucesso",
        description: "Produto deletado com sucesso",
      });
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar produto:', error);
      toast({
        title: "Erro", 
        description: "Erro ao deletar produto",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading
  };
};
