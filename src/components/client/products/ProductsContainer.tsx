
import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-start">
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
