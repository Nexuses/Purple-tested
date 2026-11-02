-- Create table for consultation submissions
CREATE TABLE public.consultation_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultation_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit consultation requests"
ON public.consultation_submissions
FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admins) can view submissions
CREATE POLICY "Authenticated users can view submissions"
ON public.consultation_submissions
FOR SELECT
USING (auth.role() = 'authenticated');