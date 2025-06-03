
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BankingHeaderProps {
  onBack: () => void;
}

export function BankingHeader({ onBack }: BankingHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    try {
      // Tenta usar o onBack passado como prop primeiro
      onBack();
    } catch (error) {
      // Se falhar, navega diretamente para o perfil
      console.log("Erro ao voltar, navegando para perfil:", error);
      navigate("/client/profile");
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            🏛️
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Conta Bancária</h1>
        </div>
      </div>
    </div>
  );
}
