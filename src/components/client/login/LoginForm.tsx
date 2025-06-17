import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
interface LoginFormProps {
  containerVariants: any;
  itemVariants: any;
}
export function LoginForm({
  containerVariants,
  itemVariants
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      console.log("Attempting client login for:", email);
      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      if (data.user) {
        console.log("User authenticated, fetching profile");
        const {
          data: profile,
          error: profileError
        } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
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
          variant: "destructive"
        });
      } else {
        setError(authError.message || "Ocorreu um erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return <motion.form onSubmit={handleSubmit} variants={containerVariants} className="space-y-5 w-full mt-[120px] mx-auto px-0">
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="relative w-full">
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} className="w-full pr-10 bg-white border-2 border-[#660099] rounded-md h-12 text-black focus:border-[#660099]" required />
          <Label htmlFor="email" className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-[#660099] font-medium bg-white px-1 ${emailFocused || email ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'}`}>
            Usuário
          </Label>
          <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </motion.div>

      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="relative w-full">
          <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} required className="w-full pr-15 bg-white border-2 border-[#660099] rounded-md h-12 text-black focus:max-w-full " />
          <Label htmlFor="password" className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-purple-400 font-medium bg-white px-1 ${passwordFocused || password ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'}`}>
            Senha
          </Label>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <motion.div className="text-center" variants={itemVariants}>
        <Link to="/client/reset-password" className="text-sm text-black hover:text-gray-700 hover:underline">
          Esqueceu sua senha?
        </Link>
      </motion.div>

      {error && <motion.div className="text-red-500 text-sm text-center" variants={itemVariants}>
          {error}
        </motion.div>}

      <motion.div variants={itemVariants} className="flex justify-center">
        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none">
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </motion.div>
    </motion.form>;
}