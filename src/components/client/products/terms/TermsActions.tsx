
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsActionsProps {
  aceito: boolean;
  onAceitoChange: (checked: boolean) => void;
  enviando: boolean;
  onCancel: () => void;
  onAccept: () => void;
}

export function TermsActions({ 
  aceito, 
  onAceitoChange, 
  enviando, 
  onCancel, 
  onAccept 
}: TermsActionsProps) {
  return (
    <div className="p-6 border-t bg-gray-50 flex-shrink-0">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="aceito-modal"
          checked={aceito}
          onCheckedChange={(checked) => onAceitoChange(checked as boolean)}
        />
        <label htmlFor="aceito-modal" className="text-sm font-medium">
          Declaro que li e aceito todos os termos.
        </label>
      </div>
      
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          disabled={!aceito || enviando}
          onClick={onAccept}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          {enviando ? "Processando..." : "Aceitar e Prosseguir"}
        </Button>
      </div>
    </div>
  );
}
