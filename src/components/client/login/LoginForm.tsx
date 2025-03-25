
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion } from "framer-motion";

interface LoginFormProps {
  containerVariants: any;
  itemVariants: any;
}

export function LoginForm({ containerVariants, itemVariants }: LoginFormProps) {
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
      console.log("Attempting client login for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      if (data.user) {
        console.log("User authenticated, fetching profile");
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw new Error("Erro ao carregar perfil do usuário");
        }

        console.log("User profile:", profile);
        navigate("/client/dashboard");
      }
    } catch (error) {
      console.error("Login process error:", error);
      const authError = error as AuthError;

      if (authError.message === "Invalid login credentials") {
        setError("Email ou senha inválidos");
      } else if (authError.message?.includes("User not found") || error === 'USER_DELETED') {
        toast({
          title: "Erro",
          description: "Usuário não encontrado",
          variant: "destructive",
        });
      } else {
        setError(authError.message || "Ocorreu um erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 -mt-17 w-full"
      variants={containerVariants}
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="email">Email</Label>
        <div className="relative rounded-md">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-4 w-4" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-white rounded-md h-9 text-black"
            required
          />
        </div>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="password">Senha</Label>
        <div className="relative rounded-md">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-4 w-4" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 bg-white rounded-md h-9 text-black"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-[#580180]" />
            ) : (
              <Eye className="h-4 w-4 text-[#580180]" />
            )}
          </button>
        </div>
      </motion.div>

      <motion.div className="text-center" variants={itemVariants}>
        <Link
          to="/client/reset-password"
          className="text-sm text-black hover:text-gray-700 hover:underline"
        >
          Esqueceu sua senha?
        </Link>
      </motion.div>

      {error && (
        <motion.div 
          className="text-red-500 text-sm"
          variants={itemVariants}
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <RainbowButton
          type="submit"
          className="w-full !bg-[#580180] hover:!bg-[#4a0668]"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </RainbowButton>
      </motion.div>
    </motion.form>
  );
}
