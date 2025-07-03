
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  active: boolean;
  order?: number;
}

export const useStoreProducts = (storeUrl?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!storeUrl) {
          setProducts([]);
          return;
        }

        // Mock products since store_products table doesn't exist yet
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

        console.log('✅ Produtos da loja carregados (mock):', mockProducts.length);
        setProducts(mockProducts);
      } catch (err) {
        console.error('❌ Erro ao buscar produtos da loja:', err);
        setError('Erro ao carregar produtos');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [storeUrl]);

  return {
    products,
    isLoading,
    error,
    refetch: () => {
      // Trigger re-fetch
      setIsLoading(true);
    }
  };
};
