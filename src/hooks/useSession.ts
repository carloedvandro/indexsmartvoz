import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getSession = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        await supabase.auth.signOut();
        navigate("/client/login");
        return null;
      }

      const session = sessionData?.session;
      if (!session?.user) {
        console.warn("No active session, redirecting to login.");
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