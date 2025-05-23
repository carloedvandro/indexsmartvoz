
import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles"> & {
  bank_name?: string | null;
  account_number?: string | null;
  account_name?: string | null;
  ifsc_code?: string | null;
  paypal_email?: string | null;
};

export type Sponsor = {
  id: string;
  full_name: string | null;
  email: string;
  custom_id: string | null;
};

export type ProfileWithSponsor = Profile & {
  sponsor?: Sponsor | null;
};
