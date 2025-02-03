import { ReactNode } from "react";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return children;
}