
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type UserFilters = {
  externalId: string;
  fullName: string;
  email: string;
  status: string;
  documentId: string;
  cnpj: string;
};

export function useUsersQuery(filters: UserFilters) {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        throw new Error("Não autenticado");
      }

      let query = supabase
        .from("profiles")
        .select(`
          *,
          sponsor:profiles(
            id,
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (filters.fullName) {
        query = query.ilike("full_name", `%${filters.fullName}%`);
      }
      if (filters.email) {
        query = query.ilike("email", `%${filters.email}%`);
      }
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters.externalId) {
        query = query.ilike("external_id", `%${filters.externalId}%`);
      }
      if (filters.documentId) {
        query = query.ilike("document_id", `%${filters.documentId}%`);
      }
      if (filters.cnpj) {
        query = query.ilike("cnpj", `%${filters.cnpj}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Query error:", error);
        throw error;
      }
      
      return data;
    },
  });
}
