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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        if (session?.user) {
          const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (data?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            await supabase.auth.signOut();
            toast({
              title: t('login_error'),
              description: t('check_credentials'),
              variant: "destructive",
              duration: 6000,
            });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast, t]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
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

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="w-full md:w-[480px] p-8 flex flex-col justify-between bg-white">
        <div>
          <h1 className="text-secondary text-6xl font-bold w-[70%] mb-12">Y-TECH</h1>
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
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? t('entering') : t('enter')}
            </Button>
          </form>
        </div>
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LanguageSelector />
          </div>
          <p>
            {t('technology_by')}{" "}
            <a href="#" className="underline">
              Yrwen Technology<sup className="text-sm align-top">®</sup>
            </a>
          </p>
        </div>
      </div>
      {/* Right side - Background image */}
      <div 
        className="hidden md:block flex-1 bg-[#004d31] bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=4076')] bg-cover bg-center bg-blend-soft-light"
      />
    </div>
  );
}