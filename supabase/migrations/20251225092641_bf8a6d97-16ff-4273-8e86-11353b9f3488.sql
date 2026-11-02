-- Add phone column to consultation_submissions table
ALTER TABLE public.consultation_submissions 
ADD COLUMN phone text;