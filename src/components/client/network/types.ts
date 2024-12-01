export interface NetworkMember {
  id: string;
  user_id: string;
  parent_id: string | null;
  level: number;
  team_size?: number;
  children: NetworkMember[];
  user: {
    id: string;
    email: string;
    full_name: string | null;
    custom_id: string | null;
    graduation_type: string | null;
    registration_date?: string;
  };
}