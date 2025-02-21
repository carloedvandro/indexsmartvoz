
export type Customer = {
  id: string;
  customer_name: string;
  phone_number: string;
  cpf?: string;
  email?: string;
  plan_name?: string;
  data_limit: number;
  data_used: number;
  status: string;
  created_at: string;
  updated_at: string;
}
