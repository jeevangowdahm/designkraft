-- Create room_analyses table to store AI room analysis results
CREATE TABLE public.room_analyses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    room_type TEXT NOT NULL,
    dimensions TEXT,
    current_style TEXT,
    suggestions JSONB DEFAULT '[]'::jsonb,
    mood_board JSONB DEFAULT '[]'::jsonb,
    overall_score INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.room_analyses ENABLE ROW LEVEL SECURITY;

-- RLS policies for room_analyses
CREATE POLICY "Users can view their own room analyses"
ON public.room_analyses
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own room analyses"
ON public.room_analyses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own room analyses"
ON public.room_analyses
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own room analyses"
ON public.room_analyses
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_room_analyses_updated_at
BEFORE UPDATE ON public.room_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();