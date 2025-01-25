import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { WarpBackground } from "@/components/ui/warp-background";

export default function ClientLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're on a password recovery route
    const isPasswordRecovery = window.location.hash.includes('#access_token') && 
                              window.location.hash.includes('type=recovery');

    if (isPasswordRecovery) {
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

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session) {
        navigate('/client/dashboard');
      } else if (event === 'SIGNED_OUT') {
        navigate('/client/login');
      } else if (event === 'PASSWORD_RECOVERY') {
        navigate('/client/reset-password');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white" />
        <div className="bubble-animation">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={{
                '--size': `${Math.random() * 4 + 2}rem`,
                '--left': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[500px] mx-4">
        {/* Logo with rainbow animation */}
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] animate-rainbow bg-clip-text text-transparent">
          Smartvoz
        </h1>

        {/* Glass morphism card */}
        <WarpBackground
          className="backdrop-blur-md bg-white/80 shadow-xl rounded-2xl p-8"
          beamsPerSide={3}
          beamSize={5}
          beamDuration={3}
        >
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: 'linear-gradient(45deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                  backgroundSize: '200% auto',
                  color: 'white',
                  borderRadius: '9999px',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: '100%',
                  marginTop: '1rem',
                  transition: 'all 0.3s ease',
                  animation: 'rainbow 3s ease infinite',
                },
                anchor: {
                  color: '#000000',
                  opacity: '0.9',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'opacity 0.2s ease',
                },
                input: {
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  fontSize: '1rem',
                  width: '100%',
                  backgroundColor: 'white',
                  color: '#000000',
                },
                message: {
                  color: '#000000',
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                },
                label: {
                  color: '#000000',
                  opacity: '0.9',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                },
                container: {
                  position: 'relative',
                },
              },
              className: {
                container: 'relative space-y-4',
                button: 'hover:bg-right transition-all duration-500 ease-in-out hover:shadow-lg',
                input: 'pl-10 focus:border-gray-600 focus:ring-gray-600',
                label: 'block text-sm font-medium mb-1',
                message: 'text-sm mt-1',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Entrar",
                  loading_button_label: "Entrando...",
                  password_input_placeholder: "Sua senha",
                  email_input_placeholder: "Seu email",
                },
                sign_up: {
                  link_text: "",
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Registrar",
                  loading_button_label: "Registrando...",
                  password_input_placeholder: "Sua senha",
                  email_input_placeholder: "Seu email",
                },
                forgotten_password: {
                  link_text: "Esqueceu sua senha?",
                  button_label: "Enviar instruções",
                  confirmation_text: "Enviamos as instruções para seu email",
                },
              }
            }}
            theme="default"
            providers={[]}
            redirectTo={`${window.location.origin}/client/dashboard`}
            view="sign_in"
            showLinks={true}
          />
        </WarpBackground>
      </div>

      {/* Styles for bubbles */}
      <style>{`
        .bubble-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .bubble {
          position: absolute;
          left: var(--left);
          bottom: -20%;
          width: var(--size);
          height: var(--size);
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          border-radius: 50%;
          opacity: 0.1;
          animation: float 15s infinite linear;
          animation-delay: var(--delay);
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}