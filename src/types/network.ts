
export type NetworkPlan = {
  id: string;
  name: string;
  code: string;
  price: number;
  active: boolean;
  spillover_limit: number;
  created_at: string;
  updated_at: string;
  commissions: {
    level: number;
    commission_value: number;
  }[];
};
