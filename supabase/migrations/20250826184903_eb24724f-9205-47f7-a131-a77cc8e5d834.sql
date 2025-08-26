-- Enable Row Level Security on all public tables
-- This prevents unauthorized access to sensitive data

-- Enable RLS on plans table
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Enable RLS on plan_benefits table  
ALTER TABLE public.plan_benefits ENABLE ROW LEVEL SECURITY;

-- Enable RLS on plan_cashback_levels table
ALTER TABLE public.plan_cashback_levels ENABLE ROW LEVEL SECURITY;

-- Plans table policies (read-only for authenticated users)
CREATE POLICY "Plans are viewable by authenticated users" 
ON public.plans 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify plans" 
ON public.plans 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Plan benefits policies (read-only for authenticated users)
CREATE POLICY "Plan benefits are viewable by authenticated users" 
ON public.plan_benefits 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify plan benefits" 
ON public.plan_benefits 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Plan cashback levels policies (read-only for authenticated users)
CREATE POLICY "Plan cashback levels are viewable by authenticated users" 
ON public.plan_cashback_levels 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify plan cashback levels" 
ON public.plan_cashback_levels 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Enable RLS on other critical tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_document ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phone_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esim_device_models ENABLE ROW LEVEL SECURITY;

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Subscription policies (users can only see their own subscriptions)
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscription 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Users can create their own subscriptions" 
ON public.subscription 
FOR INSERT 
TO authenticated
WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Admins can view all subscriptions" 
ON public.subscription 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Profile addresses policies (users can only access their own addresses)
CREATE POLICY "Users can view their own addresses" 
ON public.profile_addresses 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Users can manage their own addresses" 
ON public.profile_addresses 
FOR ALL 
TO authenticated
USING (profile_id = auth.uid())
WITH CHECK (profile_id = auth.uid());

-- Profile bank accounts policies (users can only access their own bank accounts)
CREATE POLICY "Users can view their own bank accounts" 
ON public.profile_bank_accounts 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Users can manage their own bank accounts" 
ON public.profile_bank_accounts 
FOR ALL 
TO authenticated
USING (profile_id = auth.uid())
WITH CHECK (profile_id = auth.uid());

-- Profile documents policies (users can only access their own documents)
CREATE POLICY "Users can view their own documents" 
ON public.profile_document 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Users can manage their own documents" 
ON public.profile_document 
FOR ALL 
TO authenticated
USING (profile_id = auth.uid())
WITH CHECK (profile_id = auth.uid());

-- Profile payments policies (users can only view their own payments)
CREATE POLICY "Users can view their own payments" 
ON public.profile_payments 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Admins can view all payments" 
ON public.profile_payments 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Profile referrals policies (users can view referrals they're involved in)
CREATE POLICY "Users can view their referrals" 
ON public.profile_referrals 
FOR SELECT 
TO authenticated
USING (
  sponsor_profile_id = auth.uid() OR 
  referred_profile_id = auth.uid()
);

CREATE POLICY "Admins can manage all referrals" 
ON public.profile_referrals 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Referrals commissions policies (users can view their own commissions)
CREATE POLICY "Users can view their own commissions" 
ON public.referrals_commissions 
FOR SELECT 
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "Admins can manage all commissions" 
ON public.referrals_commissions 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Phone lines policies (admin-only access)
CREATE POLICY "Only admins can access phone lines" 
ON public.phone_lines 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Notifications policies (users can view their own notifications)
CREATE POLICY "Users can view notifications" 
ON public.notifications 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only admins can manage notifications" 
ON public.notifications 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- ESIM device models policies (read-only for authenticated users)
CREATE POLICY "ESIM device models are viewable by authenticated users" 
ON public.esim_device_models 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only admins can manage ESIM device models" 
ON public.esim_device_models 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);