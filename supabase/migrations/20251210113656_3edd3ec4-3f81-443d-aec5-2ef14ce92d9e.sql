-- Add hiring_location and salary_budget columns to consultation_submissions
ALTER TABLE public.consultation_submissions 
ADD COLUMN hiring_location text,
ADD COLUMN salary_budget text;