
import { ReactNode } from "react";
import { ParticlesBackground } from "./ParticlesBackground";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
