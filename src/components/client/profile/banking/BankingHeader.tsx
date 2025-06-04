
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BankingHeaderProps {
  onBack: () => void;
}

export function BankingHeader({ onBack }: BankingHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
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
