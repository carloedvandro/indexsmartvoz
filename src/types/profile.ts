import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;

export type Sponsor = {
  id: string;
  full_name: string | null;
  email: string;
  custom_id: string | null;
};

export type ProfileWithSponsor = Profile & {
  sponsor?: Sponsor | null;
};