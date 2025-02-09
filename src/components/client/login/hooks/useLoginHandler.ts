
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

export function useLoginHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent, email: string, password: string) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Starting login process for:", email);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (signInError) {
        console.error("Login error:", signInError);
        throw signInError;
      }

      if (!data.user) {
        throw new Error("No user data returned");
      }

      console.log("User authenticated successfully, fetching profile");
      
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

      // Check if user is active
      if (profile.status?.toLowerCase() !== 'active' && profile.status?.toLowerCase() !== 'ativo') {
        throw new Error("Conta inativa. Entre em contato com o suporte.");
      }

      console.log("Login successful, redirecting to dashboard");
      navigate("/client/dashboard");
      
    } catch (error) {
      console.error("Login process error:", error);
      const authError = error as AuthError;

      if (authError.message === "Invalid login credentials") {
        setError("Email ou senha incorretos");
        toast({
          title: "Erro de Login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        });
      } else if (authError.message?.includes("No user found")) {
        setError("Usuário não encontrado");
        toast({
          title: "Erro",
          description: "Usuário não encontrado",
          variant: "destructive",
        });
      } else if (authError.message?.includes("Conta inativa")) {
        setError(authError.message);
        toast({
          title: "Conta Inativa",
          description: authError.message,
          variant: "destructive",
        });
      } else {
        setError("Ocorreu um erro ao fazer login. Tente novamente.");
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao fazer login. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleLogin };
}
