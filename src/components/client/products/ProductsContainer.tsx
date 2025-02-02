import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <div className="container mx-auto p-2 pb-16 space-y-6">
        {children}
      </div>
    </div>
  );
}