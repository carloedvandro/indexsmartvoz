
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { User, Lock, Eye, EyeOff } from "lucide-react";
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
      className="space-y-6 w-full max-w-[420px] mt-[68px] mx-auto px-4 md:px-6"
      variants={containerVariants}
    >
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-purple-400 text-base font-medium">Usuário</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-10 bg-white border-2 border-purple-300 rounded-md h-12 text-black placeholder:text-transparent focus:border-purple-400"
              required
            />
            <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </motion.div>

      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-purple-400 text-base font-medium">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 bg-white border-2 border-purple-300 rounded-md h-12 text-black placeholder:text-transparent focus:border-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </button>
          </div>
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
          className="text-red-500 text-sm text-center"
          variants={itemVariants}
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="flex justify-center">
        <RainbowButton
          type="submit"
          className="w-full h-12 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md font-medium transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </RainbowButton>
      </motion.div>
    </motion.form>
  );
}
