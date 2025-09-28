-- Fix critical security vulnerability in profiles table
-- Drop the existing insecure policy that allows unrestricted access
DROP POLICY IF EXISTS "Policy with security definer functions" ON public.profiles;

-- Create secure RLS policies for profiles table
-- Users can only view and edit their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Admin users can view and manage all profiles
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Also fix the plans table policy to be more restrictive
-- Drop the existing insecure policy
DROP POLICY IF EXISTS "Policy with security definer functions" ON public.plans;

-- Create secure policy for plans - authenticated users can view, only admins can modify
CREATE POLICY "Authenticated users can view plans" 
ON public.plans 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage plans" 
ON public.plans 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Ensure RLS is enabled on both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;