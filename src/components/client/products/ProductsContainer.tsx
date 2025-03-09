
import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
