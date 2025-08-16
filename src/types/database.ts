
// Tipos personalizados baseados na estrutura real das tabelas
export interface ProfileAddress {
  id: string;
  profile_id: string;
  cep: string | null;
  street: string | null;
  neighborhood: string | null;
  number: string | null;
  city: string | null;
  state: string | null;
  complement: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface ProfileBankAccount {
  id: string;
  profile_id: string;
  type_key_pix: string | null;
  key_pix: string | null;
  created_at: string;
}

export interface ProfileDocument {
  id: string;
  profile_id: string;
  image_url: string | null;
  state: string | null;
  side: string | null;
  created_at: string;
}

export interface ProfilePayment {
  id: string;
  profile_id: string | null;
  amount: number | null;
  status: string | null;
  bank_account_id: string | null;
  payment_at: string | null;
  created_at: string;
}

export interface ProfileReferral {
  id: string;
  referred_profile_id: string | null;
  sponsor_profile_id: string | null;
  plan_id: string | null;
  referred_at: string | null;
  created_at: string;
}

export interface ReferralCommission {
  id: string;
  referral_id: string | null;
  profile_id: string | null;
  plan_cashback_level_id: string | null;
  amount: number | null;
  status: string | null;
  created_at: string;
}

export interface Plan {
  id: string;
  title: string | null;
  description: string | null;
  value: number | null;
  first_purchase_cashback: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface PlanBenefit {
  id: string;
  plan_id: string | null;
  title: string | null;
  description: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface PlanCashbackLevel {
  id: string;
  plan_id: string | null;
  level: number | null;
  amount: number | null;
  percentage: number | null;
  description: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Subscription {
  id: string;
  profile_id: string | null;
  plan_id: string | null;
  ordem_id: string | null;
  external_subscrition_id: string | null;
  status: string | null;
  gateway: string | null;
  started_at: string | null;
  renewed_at: string | null;
  expires_at: string | null;
  canceled_at: string | null;
  update_at: string | null;
  created_at: string;
}

// Tipos para criação (sem id e timestamps)
export type CreateProfileAddress = Omit<ProfileAddress, 'id' | 'created_at' | 'updated_at'>;
export type CreateProfileBankAccount = Omit<ProfileBankAccount, 'id' | 'created_at'>;
export type CreateProfileDocument = Omit<ProfileDocument, 'id' | 'created_at'>;
export type CreateProfilePayment = Omit<ProfilePayment, 'id' | 'created_at'>;
export type CreateProfileReferral = Omit<ProfileReferral, 'id' | 'created_at'>;
export type CreateReferralCommission = Omit<ReferralCommission, 'id' | 'created_at'>;
export type CreatePlan = Omit<Plan, 'id' | 'created_at' | 'updated_at'>;
export type CreatePlanBenefit = Omit<PlanBenefit, 'id' | 'created_at' | 'updated_at'>;
export type CreatePlanCashbackLevel = Omit<PlanCashbackLevel, 'id' | 'created_at' | 'updated_at'>;

// Tipos para atualização (campos opcionais)
export type UpdateProfileAddress = Partial<Omit<ProfileAddress, 'id' | 'created_at' | 'profile_id'>>;
export type UpdateProfileBankAccount = Partial<Omit<ProfileBankAccount, 'id' | 'created_at' | 'profile_id'>>;
export type UpdateProfileDocument = Partial<Omit<ProfileDocument, 'id' | 'created_at' | 'profile_id'>>;
export type UpdateProfilePayment = Partial<Omit<ProfilePayment, 'id' | 'created_at' | 'profile_id'>>;
export type UpdatePlan = Partial<Omit<Plan, 'id' | 'created_at'>>;
export type UpdatePlanBenefit = Partial<Omit<PlanBenefit, 'id' | 'created_at' | 'plan_id'>>;
export type UpdatePlanCashbackLevel = Partial<Omit<PlanCashbackLevel, 'id' | 'created_at' | 'plan_id'>>;
