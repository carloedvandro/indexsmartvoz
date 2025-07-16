
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacialBiometryFlow } from "@/components/client/register/facial-biometry/FacialBiometryFlow";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      
      // Update user's profile with verification status
      const { error } = await supabase
        .from('profiles')
        .update({
          facial_verification_status: verificationData.facialVerification ? 'verified' : 'failed',
          facial_biometry_status: 'completed',
          facial_biometry_date: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }

      toast({
        title: "Biometria Facial Concluída",
        description: "Agora vamos verificar seus documentos!",
      });
      
      // Navigate to document verification
      navigate("/client/document-verification");
    } catch (error: any) {
      console.error("Verification completion error:", error);
      toast({
        title: "Erro ao finalizar biometria",
        description: error.message || "Ocorreu um erro ao salvar os dados de biometria.",
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
    <div className="min-h-screen w-full bg-white">
      <div className="flex flex-col justify-center items-center min-h-screen text-white" style={{ backgroundColor: '#5f0889' }}>
        <div className="w-full h-full max-w-md">
          <FacialBiometryFlow 
            onComplete={handleVerificationComplete} 
            onBack={handleBack} 
          />
        </div>
      </div>
    </div>
  );
}
