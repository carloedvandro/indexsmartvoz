
import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles"> & {
  bank_name?: string | null;
  account_number?: string | null;
  account_name?: string | null;
  agency_number?: string | null;
  agency_digit?: string | null;
  account_digit?: string | null;
  account_type?: string | null;
  cpf_cnpj?: string | null;
  security_password?: string | null;
  ifsc_code?: string | null;
  paypal_email?: string | null;
  profile_image?: string | null;
  // Campos extras de endereço vindos da tabela user_addresses
  address_number?: string | null;
  neighborhood?: string | null;
  complement?: string | null;
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
