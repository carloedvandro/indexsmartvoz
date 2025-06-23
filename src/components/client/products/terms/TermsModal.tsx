
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TermsContent } from "./TermsContent";
import { TermsActions } from "./TermsActions";
import { useTermsAcceptance } from "./useTermsAcceptance";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (accepted: boolean) => void;
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const { aceito, setAceito, enviando, handleAceite } = useTermsAcceptance({ 
    onAccept, 
    onClose 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-xl font-bold text-[#8425af]">
            Termo de contratação digital – serviço de linha pré-paga com renovação mensal
          </DialogTitle>
        </DialogHeader>
        
        <TermsContent />
        
        <TermsActions 
          aceito={aceito}
          onAceitoChange={setAceito}
          enviando={enviando}
          onCancel={onClose}
          onAccept={handleAceite}
        />
      </DialogContent>
    </Dialog>
  );
}
