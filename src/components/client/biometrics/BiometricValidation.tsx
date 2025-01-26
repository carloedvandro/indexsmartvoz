import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { BiometricSteps } from "./steps/BiometricSteps";

export function BiometricValidation() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClose = () => {
    setOpen(false);
    navigate("/client/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Validação Biométrica
          </DialogTitle>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <BiometricSteps onClose={handleClose} toast={toast} />
      </DialogContent>
    </Dialog>
  );
}