
import React from "react";

interface ExampleProductsProps {
  setSelectedProduct: (product: any) => void;
  onDelete: (id: string) => void;
}

export function ExampleProducts({ setSelectedProduct, onDelete }: ExampleProductsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Empty content - buttons removed */}
    </div>
  );
}
