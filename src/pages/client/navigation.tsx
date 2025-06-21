
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationContent } from "@/components/client/navigation/NavigationContent";

export default function ClientNavigation() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 px-4 pb-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-white p-0 h-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>
      <NavigationContent />
    </div>
  );
}
