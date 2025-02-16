
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/user/userReset";
import { Mail } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);

      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });

    } catch (error: any) {
      toast({
        title: "Erro ao enviar email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10 container flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[350px] space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-[2.4rem] leading-[3.6rem] tracking-wide font-black bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-16 mb-12">
              Smartvoz
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-transparent"
                  required
                />
              </div>
            </div>

            <RainbowButton
              type="submit"
              className="w-full !bg-purple-600 hover:!bg-purple-700"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Continuar"}
            </RainbowButton>
          </form>

          <div className="text-center">
            <Link
              to="/client/login"
              className="text-sm text-gray-600 hover:text-gray-700 hover:underline"
            >
              Voltar para login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
