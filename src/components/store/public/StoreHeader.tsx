import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StoreHeaderProps {
  ownerName: string;
}

export function StoreHeader({ ownerName }: StoreHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold">Loja de {ownerName}</h1>
    </div>
  );
}