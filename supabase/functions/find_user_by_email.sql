
-- Function to find a user by email
CREATE OR REPLACE FUNCTION public.find_user_by_email(email_to_find TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  raw_user_meta_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  -- Admin users can search all users, otherwise users can only see themselves
  IF EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RETURN QUERY
    SELECT 
      au.id,
      au.email,
      au.raw_user_meta_data,
      au.created_at
    FROM auth.users AS au
    WHERE LOWER(au.email) = LOWER(email_to_find);
  ELSE
    RETURN QUERY
    SELECT 
      au.id,
      au.email,
      au.raw_user_meta_data,
      au.created_at
    FROM auth.users AS au
    WHERE au.id = auth.uid() 
    AND LOWER(au.email) = LOWER(email_to_find);
  END IF;
END;
$$;

-- Grant permissions to execute this function
GRANT EXECUTE ON FUNCTION public.find_user_by_email TO authenticated;
