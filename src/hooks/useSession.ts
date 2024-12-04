import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const useSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
        navigate("/client/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getSession = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        await supabase.auth.signOut();
        navigate("/client/login");
        return null;
      }

      if (!session?.user) {
        console.warn("No active session found");
        navigate("/client/login");
        return null;
      }

      return session;
    } catch (error) {
      console.error("Session retrieval error:", error);
      await supabase.auth.signOut();
      navigate("/client/login");
      return null;
    }
  };

  return { getSession };
};