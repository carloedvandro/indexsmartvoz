import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
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
              title: "Acesso negado",
              description: "Esta área é restrita para administradores.",
              variant: "destructive",
              duration: 6000,
            });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

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
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
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
          <img 
            src="/lovable-uploads/cdbdd204-5032-464f-99df-1b02caeaf7ef.png" 
            alt="Logo" 
            className="h-8 mb-12"
          />
          <h1 className="text-lg font-medium mb-8">ADMINISTRAÇÃO</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Usuário</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
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
              className="w-full bg-gray-600 hover:bg-gray-700"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/placeholder.svg" alt="Language" className="h-4 w-4" />
            <span>Português</span>
          </div>
          <p>
            Tecnologia por{" "}
            <a href="#" className="underline">
              WI Digital
            </a>
          </p>
        </div>
      </div>
      {/* Right side - Background image */}
      <div 
        className="hidden md:block flex-1 bg-[#004d31] bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029')] bg-cover bg-center bg-blend-soft-light"
      >
        <div className="h-full w-full flex items-end justify-end p-8">
          <img 
            src="/lovable-uploads/cdbdd204-5032-464f-99df-1b02caeaf7ef.png" 
            alt="Logo" 
            className="h-12 opacity-80"
          />
        </div>
      </div>
    </div>
  );
}