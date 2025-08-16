
import { Tables } from "@/integrations/supabase/types";

// Tipos básicos das tabelas
export type ProfileAddress = Tables<"profile_addresses">;
export type ProfileBankAccount = Tables<"profile_bank_accounts">;
export type ProfileDocument = Tables<"profile_document">;
export type ProfilePayment = Tables<"profile_payments">;
export type ProfileReferral = Tables<"profile_referrals">;
export type ReferralCommission = Tables<"referrals_commissions">;
export type Plan = Tables<"plans">;
export type PlanBenefit = Tables<"plan_benefits">;
export type PlanCashbackLevel = Tables<"plan_cashback_levels">;
export type Subscription = Tables<"subscription">;

// Tipos para criação (sem id e timestamps)
export type CreateProfileAddress = Omit<ProfileAddress, 'id' | 'created_at' | 'updated_at'>;
export type CreateProfileBankAccount = Omit<ProfileBankAccount, 'id' | 'created_at'>;
export type CreateProfileDocument = Omit<ProfileDocument, 'id' | 'created_at'>;
export type CreateProfilePayment = Omit<ProfilePayment, 'id' | 'created_at'>;
export type CreateProfileReferral = Omit<ProfileReferral, 'id' | 'created_at'>;
export type CreateReferralCommission = Omit<ReferralCommission, 'id' | 'created_at'>;

// Tipos para atualização (campos opcionais)
export type UpdateProfileAddress = Partial<Omit<ProfileAddress, 'id' | 'created_at' | 'profile_id'>>;
export type UpdateProfileBankAccount = Partial<Omit<ProfileBankAccount, 'id' | 'created_at' | 'profile_id'>>;
export type UpdateProfileDocument = Partial<Omit<ProfileDocument, 'id' | 'created_at' | 'profile_id'>>;
export type UpdateProfilePayment = Partial<Omit<ProfilePayment, 'id' | 'created_at' | 'profile_id'>>;
