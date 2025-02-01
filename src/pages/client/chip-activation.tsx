import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientChipActivation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Ativação do Chip do Plano</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Aqui você poderá ativar o chip do seu plano. Em breve mais informações...
          </p>
        </div>
      </div>
    </div>
  );
}