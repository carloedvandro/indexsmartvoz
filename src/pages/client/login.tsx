
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Starting login process for:", email);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        console.error("Login error:", signInError);
        throw signInError;
      }

      console.log("User authenticated successfully, fetching profile");

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, status")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw new Error("Erro ao carregar perfil do usuário");
        }

        if (!profile) {
          throw new Error("Perfil não encontrado");
        }

        if (profile.status === 'inactive') {
          throw new Error("Conta inativa. Entre em contato com o suporte.");
        }

        if (profile.role !== "client") {
          throw new Error("Acesso não autorizado");
        }

        navigate("/client/dashboard");
      }
    } catch (error) {
      console.error("Login process error:", error);
      const authError = error as AuthError;

      if (authError?.message?.includes("Invalid login credentials")) {
        setError("Email ou senha inválidos");
      } else if (authError?.message?.includes("Email not confirmed")) {
        setError("Email não confirmado. Verifique sua caixa de entrada.");
      } else if (authError?.message?.includes("Too many requests")) {
        setError("Muitas tentativas. Tente novamente em alguns minutos.");
      } else if (authError?.message?.includes("Conta inativa")) {
        setError("Conta inativa. Entre em contato com o suporte.");
      } else {
        setError("Ocorreu um erro ao fazer login. Tente novamente.");
      }
      
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message || "Ocorreu um erro ao fazer login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <ParticlesBackground />
      <div className="w-full max-w-[350px] space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-16 mb-16">
            Smartvoz
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/client/reset-password"
              className="text-sm text-black hover:text-gray-700 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <RainbowButton
            type="submit"
            className="w-full !bg-purple-600 hover:!bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </RainbowButton>
        </form>

        <div className="space-y-2 text-center text-sm">
          <div className="text-gray-700">
            Não tem uma conta? <Link to="/client/register" className="text-black font-semibold hover:underline">
              Criar nova conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
