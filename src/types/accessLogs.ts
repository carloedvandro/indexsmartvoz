
import { Database } from "@/integrations/supabase/types";

export type OfficeAccessLog = Database["public"]["Tables"]["office_access_logs"]["Row"];

export type AccessLogAction = "login" | "logout" | "failed_login" | "password_change" | "password_reset";
