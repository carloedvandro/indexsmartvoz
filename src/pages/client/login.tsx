import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import { BiometricValidation } from "@/components/client/biometrics/BiometricValidation";
import { useToast } from "@/hooks/use-toast";

export default function ClientLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkBiometricStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('facial_validation_status, document_validated')
          .eq('id', session.user.id)
          .single();

        if (profile?.facial_validation_status === 'approved' && profile?.document_validated) {
          setShowLoginForm(true);
        }
      }
    };

    checkBiometricStatus();
  }, []);

  const handleBiometricComplete = () => {
    setShowBiometricModal(false);
    setShowLoginForm(true);
    toast({
      title: "Validação concluída!",
      description: "Agora você pode fazer login no sistema.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[500px] relative z-10 mx-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Smartvoz
          </h1>
        </div>

        {!showLoginForm ? (
          <div className="space-y-4">
            <Button
              onClick={() => setShowBiometricModal(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              Iniciar Validação Biométrica
            </Button>
            <p className="text-sm text-center text-gray-500">
              Para sua segurança, precisamos validar sua identidade antes de prosseguir
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <Fingerprint className="w-4 h-4 text-green-500" />
              Validação biométrica concluída
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    backgroundColor: '#6B21A8',
                    color: 'white',
                    borderRadius: '9999px',
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    width: '100%',
                    marginTop: '1rem',
                  },
                  anchor: {
                    color: '#6B21A8',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  },
                  input: {
                    borderRadius: '0.75rem',
                    border: '1px solid #E5E7EB',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    fontSize: '1rem',
                    width: '100%',
                    backgroundColor: 'white',
                    color: '#1F2937',
                  },
                  message: {
                    color: '#EF4444',
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                  },
                  label: {
                    color: '#1F2937',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: 'hover:bg-purple-700 transition-colors',
                  input: 'focus:border-purple-500 focus:ring-purple-500',
                  label: 'block text-sm font-medium',
                  message: 'text-sm text-red-500',
                  anchor: 'text-black [&>span:last-child]:font-bold',
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: t('sign_in.email_label'),
                    password_label: t('sign_in.password_label'),
                    button_label: t('sign_in.button_label'),
                    loading_button_label: t('sign_in.loading_button_label'),
                    password_input_placeholder: t('sign_in.password_input_placeholder'),
                    email_input_placeholder: t('sign_in.email_input_placeholder'),
                  }
                }
              }}
              theme="default"
              providers={[]}
              redirectTo={`${window.location.origin}/client/dashboard`}
              view="sign_in"
              showLinks={false}
            />
          </>
        )}

        {showBiometricModal && (
          <BiometricValidation 
            onComplete={handleBiometricComplete}
          />
        )}
      </div>
    </div>
  );
}