
-- Create RPC functions for user address operations to handle TypeScript type issues

-- Function to get user address
CREATE OR REPLACE FUNCTION public.get_user_address(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  cep TEXT,
  street TEXT,
  neighborhood TEXT,
  number TEXT,
  city TEXT,
  state TEXT,
  complement TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ua.id,
    ua.user_id,
    ua.cep,
    ua.street,
    ua.neighborhood,
    ua.number,
    ua.city,
    ua.state,
    ua.complement,
    ua.created_at,
    ua.updated_at
  FROM public.user_addresses ua
  WHERE ua.user_id = p_user_id;
END;
$$;

-- Function to create user address
CREATE OR REPLACE FUNCTION public.create_user_address(
  p_user_id UUID,
  p_cep TEXT,
  p_street TEXT,
  p_neighborhood TEXT,
  p_number TEXT,
  p_city TEXT,
  p_state TEXT,
  p_complement TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.user_addresses (
    user_id,
    cep,
    street,
    neighborhood,
    number,
    city,
    state,
    complement,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_cep,
    p_street,
    p_neighborhood,
    p_number,
    p_city,
    p_state,
    p_complement,
    NOW(),
    NOW()
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$;

-- Function to update user address
CREATE OR REPLACE FUNCTION public.update_user_address(
  p_user_id UUID,
  p_cep TEXT,
  p_street TEXT,
  p_neighborhood TEXT,
  p_number TEXT,
  p_city TEXT,
  p_state TEXT,
  p_complement TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.user_addresses
  SET 
    cep = p_cep,
    street = p_street,
    neighborhood = p_neighborhood,
    number = p_number,
    city = p_city,
    state = p_state,
    complement = p_complement,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;
