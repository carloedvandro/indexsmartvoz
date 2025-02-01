import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ActivationSteps = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center">
          1
        </div>
        <div className="flex-1 h-1 bg-[#8425af] mx-2" />
      </div>
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center">
          2
        </div>
        <div className="flex-1 h-1 bg-[#8425af] mx-2" />
      </div>
      <div className="w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center">
        3
      </div>
    </div>
  );
};

export const PageHeader = () => {
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
      <h1 className="text-2xl font-bold">Ativação do Chip do Plano</h1>
    </div>
  );
};