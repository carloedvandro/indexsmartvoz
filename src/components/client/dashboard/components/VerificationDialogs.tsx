
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VerificationDialogsProps {
  isPhoneDialogOpen: boolean;
  setIsPhoneDialogOpen: (open: boolean) => void;
  isVerificationDialogOpen: boolean;
  setIsVerificationDialogOpen: (open: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handlePhoneNumberSubmit: () => void;
  handleVerificationSubmit: () => void;
}

export const VerificationDialogs = ({
  isPhoneDialogOpen,
  setIsPhoneDialogOpen,
  isVerificationDialogOpen,
  setIsVerificationDialogOpen,
  phoneNumber,
  setPhoneNumber,
  verificationCode,
  setVerificationCode,
  handlePhoneNumberSubmit,
  handleVerificationSubmit
}: VerificationDialogsProps) => {
  return (
    <>
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Digite seu número de telefone</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="(00) 00000-0000"
            value={phoneNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                setPhoneNumber(value);
              }
            }}
          />
          <DialogFooter>
            <Button onClick={() => setIsPhoneDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handlePhoneNumberSubmit} className="bg-[#8425af] hover:bg-[#6c1e8f] text-white">
              Enviar código
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Digite o código de verificação</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="000000"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 6) {
                setVerificationCode(value);
              }
            }}
            maxLength={6}
          />
          <DialogFooter>
            <Button onClick={() => setIsVerificationDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleVerificationSubmit} className="bg-[#8425af] hover:bg-[#6c1e8f] text-white">
              Verificar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
