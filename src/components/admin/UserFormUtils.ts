import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export const updateProfile = async (id: string, data: Partial<Profile>) => {
  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    throw error;
  }
};