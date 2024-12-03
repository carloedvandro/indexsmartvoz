import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const navigate = useNavigate();

  const getSession = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
      throw sessionError;
    }

    const session = sessionData?.session;
    if (!session?.user) {
      console.warn("No active session, redirecting to login.");
      navigate("/client/login");
      return null;
    }

    return session;
  };

  return { getSession };
};