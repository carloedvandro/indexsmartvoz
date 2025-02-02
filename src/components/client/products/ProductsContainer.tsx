import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="min-h-screen overflow-y-auto">
      {children}
    </div>
  );
}