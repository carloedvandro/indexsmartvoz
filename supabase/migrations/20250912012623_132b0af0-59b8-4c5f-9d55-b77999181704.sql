-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS custom_id TEXT,
ADD COLUMN IF NOT EXISTS mobile TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Brasil',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS person_type TEXT DEFAULT 'individual';

-- Create network table for affiliate structure
CREATE TABLE IF NOT EXISTS public.network (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.network(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1,
  network_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on network table
ALTER TABLE public.network ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for network table
CREATE POLICY "Users can view their own network data"
  ON public.network FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own network data"
  ON public.network FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own network data"
  ON public.network FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_network_user_id ON public.network(user_id);
CREATE INDEX IF NOT EXISTS idx_network_parent_id ON public.network(parent_id);
CREATE INDEX IF NOT EXISTS idx_network_level ON public.network(level);
CREATE INDEX IF NOT EXISTS idx_network_network_id ON public.network(network_id);

-- Add unique constraint for custom_id if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_custom_id_unique'
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_custom_id_unique UNIQUE (custom_id);
    END IF;
END $$;