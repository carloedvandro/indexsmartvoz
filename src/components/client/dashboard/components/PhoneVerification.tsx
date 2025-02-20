
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PhoneVerificationProps {
  isPhoneDialogOpen: boolean;
  setIsPhoneDialogOpen: (open: boolean) => void;
  isVerificationDialogOpen: boolean;
  setIsVerificationDialogOpen: (open: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  setIsVerified: (verified: boolean) => void;
  loadDataUsage: (userId: string) => Promise<void>;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  isPhoneDialogOpen,
  setIsPhoneDialogOpen,
  isVerificationDialogOpen,
  setIsVerificationDialogOpen,
  phoneNumber,
  setPhoneNumber,
  setIsVerified,
  loadDataUsage
}) => {
  const [verificationCode, setVerificationCode] = useState("");

  const sendVerificationSMS = async (phoneNumber: string, code: string) => {
    try {
      console.log(`Enviando SMS para ${phoneNumber} com o código: ${code}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Código de verificação enviado para ${phoneNumber}. Use: ${code}`);
      return true;
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
      toast.error('Erro ao enviar código de verificação. Tente novamente.');
      return false;
    }
  };

  const handlePhoneNumberSubmit = async () => {
    if (!phoneNumber.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      toast.error("Número de telefone inválido");
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      toast.error("Sessão não encontrada. Faça login novamente.");
      return;
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Código gerado:", verificationCode);
    
    const smsSent = await sendVerificationSMS(phoneNumber, verificationCode);
    
    if (!smsSent) {
      toast.error("Erro ao enviar SMS. Tente novamente.");
      return;
    }

    try {
      const { error } = await supabase
        .from("phone_verifications")
        .upsert({
          user_id: session.session.user.id,
          phone_number: phoneNumber,
          verification_code: verificationCode,
          verified: false
        });

      if (error) {
        console.error("Erro ao registrar verificação:", error);
        toast.error("Erro ao registrar número. Tente novamente.");
        return;
      }

      setIsPhoneDialogOpen(false);
      setIsVerificationDialogOpen(true);
      toast.info("Digite o código recebido por SMS para verificar seu número");
    } catch (error) {
      console.error("Erro ao processar verificação:", error);
      toast.error("Erro ao processar verificação. Tente novamente.");
    }
  };

  const handleVerificationSubmit = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data: verification } = await supabase
      .from("phone_verifications")
      .select()
      .eq("user_id", session.session.user.id)
      .maybeSingle();

    if (verification?.verification_code === verificationCode) {
      await supabase
        .from("phone_verifications")
        .update({ verified: true })
        .eq("user_id", session.session.user.id);

      const { data: existingUsage } = await supabase
        .from("data_usage")
        .select()
        .eq("user_id", session.session.user.id)
        .maybeSingle();

      if (!existingUsage) {
        await supabase
          .from("data_usage")
          .insert([{
            user_id: session.session.user.id,
            phone_number: phoneNumber,
            usage_mb: 0,
            total_package_mb: 15360,
            active_plan_name: "Controle 15GB",
            active_plan_code: "CTRL15",
            bonus_package_mb: 5120,
            bonus_usage_mb: 0,
            bonus_expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            plan_renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }]);
      }

      setIsVerified(true);
      setIsVerificationDialogOpen(false);
      toast.success("Número verificado com sucesso!");
      
      await loadDataUsage(session.session.user.id);
    } else {
      toast.error("Código de verificação inválido");
    }
  };

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
