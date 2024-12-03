import { ProductCard } from "./ProductCard";

const placeholderProducts = [
  {
    id: "example-1",
    name: "Professional Development Course",
    description: "Comprehensive online course covering the latest industry trends and best practices.",
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    currency: "BRL",
  },
  {
    id: "example-2",
    name: "Business Consultation Package",
    description: "One-on-one consultation sessions with industry experts to grow your business.",
    price: 1499.99,
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    currency: "BRL",
  },
];

interface ExampleProductsProps {
  setSelectedProduct: (product: any) => void;
  onDelete: (id: string) => void;
}

export function ExampleProducts({ setSelectedProduct, onDelete }: ExampleProductsProps) {
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">No products yet. Here are some examples:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={setSelectedProduct}
            onDelete={onDelete}
            isExample
          />
        ))}
      </div>
    </div>
  );
}