
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProfileWithSponsor } from "@/types/profile";

export const useAvailableSponsors = (isOpen: boolean) => {
  const [availableSponsors, setAvailableSponsors] = useState<ProfileWithSponsor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSponsors = async () => {
      if (!isOpen) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, email, custom_id, status, created_at, updated_at, role")
          .order("full_name");
        
        if (error) throw error;
        
        const sponsors: ProfileWithSponsor[] = data?.map(profile => ({
          ...profile,
          account_name: null,
          account_number: null,
          address: null,
          approval_date: null,
          bank_name: null,
          birth_date: null,
          block_date: null,
          block_reason: null,
          blocked: null,
          city: null,
          civil_status: null,
          cnpj: null,
          country: null,
          cpf: null,
          created_at: profile.created_at,
          document_id: null,
          document_validated: null,
          document_validation_date: null,
          document_verification_status: null,
          email_verified: null,
          external_id: null,
          face_match_verified: null,
          facial_biometry_date: null,
          facial_biometry_status: null,
          facial_verification_status: null,
          gender: null,
          graduation_type: null,
          ifsc_code: null,
          kba_verified: null,
          license_type: null,
          mobile: null,
          monthly_graduation: null,
          paypal_email: null,
          person_type: null,
          phone: null,
          phone_verified: null,
          registration_date: null,
          role: profile.role || 'client',
          secondary_whatsapp: null,
          sponsor_id: null,
          state: null,
          store_url: null,
          updated_at: profile.updated_at,
          voucher: null,
          whatsapp: null,
          zip_code: null,
          sponsor: null,
        })) || [];
        
        setAvailableSponsors(sponsors);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de afiliados",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsors();
  }, [isOpen, toast]);

  return { availableSponsors, isLoading };
};
