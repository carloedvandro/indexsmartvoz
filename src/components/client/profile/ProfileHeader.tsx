
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  onBack: () => void;
}

export function ProfileHeader({ onBack }: ProfileHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-gray-600" />
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">MEUS DADOS</p>
              <h1 className="text-2xl font-semibold text-gray-900">Perfil</h1>
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
      </div>
    </div>
  );
}
