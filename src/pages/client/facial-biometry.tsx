
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
          document_verification_status: verificationData.documentVerification ? 'verified' : 'failed',
          verification_completed_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Verificação Concluída",
        description: "Seu cadastro foi verificado com sucesso!",
      });
      
      // Navigate to dashboard
      navigate("/client/dashboard");
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
    <div className="min-h-screen w-full bg-white">
      <div className="flex flex-col justify-center items-center min-h-screen py-8 px-5 sm:px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-4">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="h-auto w-[180px] object-contain"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <FacialBiometryFlow 
              onComplete={handleVerificationComplete} 
              onBack={handleBack} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
