-- Add fixed_value to support fixed cashback amounts per level
ALTER TABLE public.plan_cashback_levels
ADD COLUMN IF NOT EXISTS fixed_value NUMERIC;

-- Optional: ensure at least one of percentage or fixed_value is provided in app layer; DB remains permissive to avoid breaking existing flows.