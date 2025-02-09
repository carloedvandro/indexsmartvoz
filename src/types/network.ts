
export interface NetworkCommissionHistory {
  id: string;
  user_id: string;
  amount: number;
  paid: boolean;
  created_at: string;
}

export interface NetworkPlan {
  id: string;
  name: string;
  code: string;
  price: number;
  active: boolean;
  spillover_limit: number;
  created_at: string;
  updated_at: string;
}
