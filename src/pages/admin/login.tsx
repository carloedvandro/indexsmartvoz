import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from "@/components/LanguageSelector";
import '@/i18n';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profile?.role === "admin") {
          navigate("/admin/dashboard");
        }
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profile?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          await supabase.auth.signOut();
          toast({
            title: t('login_error'),
            description: t('check_credentials'),
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: t('login_error'),
        description: t('check_credentials'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="w-full md:w-[480px] p-4 sm:p-8 flex flex-col justify-between bg-white">
        <div>
          <div className="w-full flex justify-center">
            <div className="w-4/5">
              <img 
                src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images/smartvozcolorwifi.jpg?t=2025-01-21T17%3A02%3A52.916Z" 
                alt="Smartvoz Logo" 
                className="w-full h-auto mb-6 sm:mb-12"
              />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-8">{t('administration')}</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('user')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-sm text-secondary hover:underline"
              >
                {t('forgot_password')}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? t('entering') : t('enter')}
            </Button>
          </form>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LanguageSelector />
          </div>
          <p>
            {t('technology_by')}{" "}
            <a href="#" className="underline">
              lovablebr.dev<sup className="text-sm align-top">®</sup>
            </a>
          </p>
        </div>
      </div>
      {/* Right side - Background image */}
      <div 
        className="hidden md:block flex-1 bg-[url('https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images/smartvozparedeepessoas1.jpg?t=2025-01-21T16%3A50%3A20.958Z')] bg-cover bg-center"
      />
    </div>
  );
}
