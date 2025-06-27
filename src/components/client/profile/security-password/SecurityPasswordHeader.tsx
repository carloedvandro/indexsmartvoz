
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface SecurityPasswordHeaderProps {
  onBack: () => void;
}

export function SecurityPasswordHeader({ onBack }: SecurityPasswordHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">MEUS DADOS</p>
          <h1 className="text-2xl font-bold text-gray-900">Senha de Segurança</h1>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onBack}
        className="text-teal-600 border-teal-600 hover:bg-teal-50"
      >
        ← Voltar
      </Button>
    </div>
  );
}
