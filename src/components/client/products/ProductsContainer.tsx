import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}