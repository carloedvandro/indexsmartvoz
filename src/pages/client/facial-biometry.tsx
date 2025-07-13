
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
      {/* Header com Logo - completamente branco sem sombra */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50" style={{ boxShadow: 'none', border: 'none' }}>
        <div className="flex justify-center">
          <img src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" alt="Smartvoz Logo" className="h-[85px] object-contain mix-blend-multiply opacity-90 contrast-125" />
        </div>
      </div>

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
}
