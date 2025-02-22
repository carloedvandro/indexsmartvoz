
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const usePhoneVerification = (onVerificationSuccess: () => void) => {
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const sendVerificationSMS = async (phoneNumber: string, code: string) => {
    try {
      console.log(`Enviando SMS para ${phoneNumber} com o código: ${code}`);
      toast.success(`Código de verificação enviado para ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
      toast.error('Erro ao enviar código de verificação');
      return false;
    }
  };

  const loadPhoneVerification = async () => {
    console.log("Carregando verificação de telefone");
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      console.log("Nenhuma sessão encontrada");
      return;
    }

    const { data: verification, error } = await supabase
      .from("phone_verifications")
      .select()
      .eq("user_id", session.session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Erro ao carregar verificação:", error);
      return;
    }

    if (verification) {
      console.log("Verificação encontrada:", verification);
      setPhoneNumber(verification.phone_number);
      setIsVerified(verification.verified);
      
      if (verification.verified) {
        onVerificationSuccess();
      }
    } else {
      console.log("Nenhuma verificação encontrada");
    }
  };

  const handlePhoneNumberSubmit = async () => {
    if (!phoneNumber.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      toast.error("Número de telefone inválido");
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const smsSent = await sendVerificationSMS(phoneNumber, verificationCode);
    
    if (!smsSent) {
      toast.error("Erro ao enviar SMS de verificação");
      return;
    }

    const { error } = await supabase
      .from("phone_verifications")
      .upsert({
        user_id: session.session.user.id,
        phone_number: phoneNumber,
        verification_code: verificationCode,
        verified: false
      });

    if (error) {
      toast.error("Erro ao registrar número");
      return;
    }

    setIsPhoneDialogOpen(false);
    setIsVerificationDialogOpen(true);
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
        .update({
          verified: true
        })
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
      onVerificationSuccess();
    } else {
      toast.error("Código de verificação inválido");
    }
  };

  return {
    isPhoneDialogOpen,
    setIsPhoneDialogOpen,
    isVerificationDialogOpen,
    setIsVerificationDialogOpen,
    phoneNumber,
    setPhoneNumber,
    verificationCode,
    setVerificationCode,
    isVerified,
    loadPhoneVerification,
    handlePhoneNumberSubmit,
    handleVerificationSubmit
  };
};
