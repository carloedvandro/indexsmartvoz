
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacialBiometryFlow } from "@/components/client/register/facial-biometry/FacialBiometryFlow";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function FacialBiometry() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleVerificationComplete = async (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => {
    try {
      setIsCompleting(true);

      // Get user session
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user) {
        toast({
          title: "Erro de Autenticação",
          description: "Usuário não está autenticado. Faça login novamente.",
          variant: "destructive",
        });
        navigate("/client/login");
        return;
      }

      const userId = sessionData.session.user.id;
      
      // Update user's profile with verification status - using only existing columns
      const { error } = await supabase
        .from('profiles')
        .update({
          facial_verification_status: verificationData.facialVerification ? 'verified' : 'failed',
          document_verification_status: verificationData.documentVerification ? 'verified' : 'failed',
          facial_biometry_status: 'completed',
          facial_biometry_date: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }

      toast({
        title: "Verificação Concluída",
        description: "Agora vamos selecionar seu plano!",
      });
      
      // Navigate to plan selection instead of dashboard
      navigate("/client/plan-selection");
    } catch (error: any) {
      console.error("Verification completion error:", error);
      toast({
        title: "Erro ao finalizar verificação",
        description: error.message || "Ocorreu um erro ao salvar os dados de verificação.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleBack = () => {
    navigate("/client/register");
  };

  return (
    <div className="min-h-screen w-full bg-white pb-1">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-full h-full max-w-md">
          <FacialBiometryFlow 
            onComplete={handleVerificationComplete} 
            onBack={handleBack} 
          />
        </div>
      </div>
    </div>
  );
};
