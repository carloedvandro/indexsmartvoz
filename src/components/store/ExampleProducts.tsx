
interface ExampleProductsProps {
  setSelectedProduct: (product: any) => void;
  onDelete: (id: string) => void;
}

export function ExampleProducts({ setSelectedProduct, onDelete }: ExampleProductsProps) {
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">Nenhum produto cadastrado. Adicione seu primeiro produto usando o botão acima.</p>
    </div>
  );
}
