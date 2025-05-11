
import React from "react";
import { Link } from "react-router-dom";

interface ExampleProductsProps {
  setSelectedProduct: (product: any) => void;
  onDelete: (id: string) => void;
}

export function ExampleProducts({ setSelectedProduct, onDelete }: ExampleProductsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Link
        to="/client/register"
        className="px-16 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-center transition-colors"
      >
        Criar Conta
      </Link>
    </div>
  );
}
