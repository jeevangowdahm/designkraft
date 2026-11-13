-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can view designers" ON public.designers;

-- Create a new policy that only allows authenticated users to view designers
CREATE POLICY "Authenticated users can view designers" 
ON public.designers 
FOR SELECT 
TO authenticated
USING (true);