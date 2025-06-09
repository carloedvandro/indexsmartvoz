
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
      className="space-y-6 w-full"
      variants={containerVariants}
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="email" className="text-gray-700">Usuário</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 bg-white border-gray-300 rounded-lg h-12 text-gray-700 placeholder-gray-400"
            required
          />
        </div>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="password" className="text-gray-700">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 pr-12 bg-white border-gray-300 rounded-lg h-12 text-gray-700"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
          variants={itemVariants}
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-4">
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        
        <div className="text-center">
          <Link
            to="/client/reset-password"
            className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline"
          >
            Esqueci Minha Senha
          </Link>
        </div>
      </motion.div>
    </motion.form>
  );
}
