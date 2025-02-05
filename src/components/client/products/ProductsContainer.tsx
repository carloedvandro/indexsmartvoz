
import { ReactNode } from "react";
import { ParticlesBackground } from "./ParticlesBackground";

interface ProductsContainerProps {
  children: ReactNode;
}

export function ProductsContainer({ children }: ProductsContainerProps) {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">{children}</div>
    </>
  );
}
