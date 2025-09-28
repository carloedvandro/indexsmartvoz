
import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles"> & {
  // Extended banking fields that may be stored separately or in JSON
  bank_name?: string | null;
  account_number?: string | null;
  account_name?: string | null;
  agency_number?: string | null;
  agency_digit?: string | null;
  account_digit?: string | null;
  account_type?: string | null;
  security_password?: string | null;
  ifsc_code?: string | null;
  paypal_email?: string | null;
  profile_image?: string | null;
  // Address fields that may come from user_addresses table
  address_number?: string | null;
  neighborhood?: string | null;
  complement?: string | null;
  // Additional fields that exist in the database
  custom_id?: string | null;
  mobile?: string | null;
  address?: string | null;
  state?: string | null;
  country?: string | null;
  status?: string | null;
  person_type?: string | null;
  cnpj?: string | null;
};

export type Sponsor = {
  id: string;
  full_name: string | null;
  email: string;
  custom_id?: string | null;
  referred_code?: string | null;
};

export type ProfileWithSponsor = Profile & {
  sponsor?: Sponsor | null;
};
