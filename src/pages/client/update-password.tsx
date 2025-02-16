
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (!hashParams.get("access_token")) {
          navigate("/client/login");
        }
      }
    };

    handleSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      });

      // Aguardar um pouco antes de redirecionar para garantir que o usuário veja a mensagem
      setTimeout(() => {
        navigate("/client/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar senha",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[350px] space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-16 mb-12">
            Smartvoz
          </h1>
          <h2 className="text-2xl font-semibold">Nova Senha</h2>
          <p className="text-gray-500">Digite sua nova senha abaixo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nova Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <RainbowButton
            type="submit"
            className="w-full !bg-purple-600 hover:!bg-purple-700"
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar Senha"}
          </RainbowButton>
        </form>
      </div>
    </div>
  );
}
