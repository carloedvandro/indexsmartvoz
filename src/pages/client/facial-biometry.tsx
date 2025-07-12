

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewFacialBiometryFlow } from "@/components/client/biometry/NewFacialBiometryFlow";
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
    <div className="min-h-screen w-full">
      {/* Logo fixada no topo */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
            alt="Smartvoz" 
            className="h-16 object-contain" 
          />
        </div>
      </div>
      
      {/* Novo fluxo de biometria com padding-top para não ficar atrás da logo */}
      <div className="pt-20">
        <NewFacialBiometryFlow 
          onComplete={handleVerificationComplete} 
          onBack={handleBack} 
        />
      </div>
    </div>
  );
};

