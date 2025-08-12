-- Secure role check to avoid recursive RLS lookups
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Remove overly permissive policy
DROP POLICY IF EXISTS "enable_select_for_all" ON public.profiles;

-- Restrictive policies: users see only themselves; admins see all
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.get_current_user_role() = 'admin');