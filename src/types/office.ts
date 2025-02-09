
export interface OfficeAccessLog {
  id: string;
  user_id: string;
  action: string;
  password_action?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
