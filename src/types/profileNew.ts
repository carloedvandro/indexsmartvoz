
import { Tables } from "@/integrations/supabase/types";

export type ProfileNew = Tables<"profiles"> & {
  // Campos temporários para compatibilidade com formulários existentes
  address_number?: string | null;
  neighborhood?: string | null;
  complement?: string | null;
  zip_code?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
};

export type Sponsor = {
  id: string;
  full_name: string | null;
  email: string;
  referred_code: string | null;
};

export type ProfileWithSponsorNew = ProfileNew & {
  sponsor?: Sponsor | null;
};
