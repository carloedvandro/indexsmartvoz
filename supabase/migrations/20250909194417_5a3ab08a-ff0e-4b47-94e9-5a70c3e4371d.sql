-- Fix notifications security vulnerability
-- Add user_id column to associate notifications with specific users
ALTER TABLE public.notifications 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Drop the overly permissive policy that allows any user to see all notifications
DROP POLICY IF EXISTS "Users can view notifications" ON public.notifications;

-- Create secure user-specific policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (user_id = auth.uid());

-- Allow users to update read status of their own notifications
CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (user_id = auth.uid()) 
WITH CHECK (user_id = auth.uid());

-- Keep admin policy unchanged (admins can manage all notifications)
-- The existing admin policy already exists and works correctly