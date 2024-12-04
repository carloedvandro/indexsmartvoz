import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ClientLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if we're on a password recovery route
    const isPasswordRecovery = window.location.hash.includes('#access_token') && 
                              window.location.hash.includes('type=recovery');

    if (isPasswordRecovery) {
      // Redirect recovery to the client password reset page
      navigate('/client/reset-password' + window.location.hash);
      return;
    }

    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/client/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/og-image.png"
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('welcome_to')} YrWen
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('choose_access')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#9b87f5',
                    brandAccent: '#7E69AB',
                  },
                },
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
                },
                forgotten_password: {
                  link_text: t('forgot_password'),
                  button_label: t('reset_password'),
                }
              }
            }}
            theme="light"
            providers={[]}
            redirectTo={`${window.location.origin}/client/dashboard`}
          />
        </div>
      </div>
    </div>
  );
}