import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="min-h-screen overflow-y-auto flex flex-col items-center justify-start">
      {children}
    </div>
  );
}