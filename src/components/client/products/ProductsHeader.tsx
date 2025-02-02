import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ProductsHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline"
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
        onClick={() => navigate("/client/dashboard")}
      >
        Voltar
      </Button>
    </div>
  );
}