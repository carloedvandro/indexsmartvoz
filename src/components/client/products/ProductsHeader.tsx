import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProductsHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold">
        Contratação de Planos
      </h1>
    </div>
  );
}
