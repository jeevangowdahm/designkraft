-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_department TEXT,
  experience TEXT,
  current_company TEXT,
  portfolio_url TEXT,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Admins can view and manage all applications
CREATE POLICY "Admins can manage job applications"
ON public.job_applications
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'tips',
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL,
  author_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can view published posts
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (is_published = true);

-- Admins can manage all posts
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image, category, tags, author_name, author_image, is_published, published_at) VALUES
(
  '10 Interior Design Trends Dominating Indian Homes in 2025',
  '10-interior-design-trends-2025',
  'Discover the hottest design trends that are transforming Indian homes this year, from sustainable materials to smart home integration.',
  'Indian homes are undergoing a remarkable transformation in 2025. Here are the top trends:\n\n## 1. Sustainable & Eco-Friendly Materials\nHomeowners are increasingly choosing bamboo, reclaimed wood, and recycled materials.\n\n## 2. Biophilic Design\nBringing nature indoors with living walls, indoor gardens, and natural textures.\n\n## 3. Smart Home Integration\nSeamless technology integration that enhances comfort without compromising aesthetics.\n\n## 4. Warm Minimalism\nClean lines with warm, earthy tones replacing cold, stark minimalism.\n\n## 5. Artisanal & Handcrafted Elements\nSupporting local craftsmen with handmade furniture and decor.',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'trends',
  ARRAY['trends', 'interior design', '2025', 'indian homes'],
  'Jeevan Gowda H M',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  true,
  NOW() - INTERVAL '2 days'
),
(
  'How to Choose the Perfect Color Palette for Your Living Room',
  'perfect-color-palette-living-room',
  'A comprehensive guide to selecting colors that create harmony and reflect your personality in your living space.',
  'Choosing the right color palette can transform your living room from ordinary to extraordinary.\n\n## Understanding Color Psychology\nColors affect our mood and energy levels. Warm colors energize, while cool colors calm.\n\n## The 60-30-10 Rule\n- 60% dominant color (walls, large furniture)\n- 30% secondary color (curtains, accent furniture)\n- 10% accent color (decor, pillows)\n\n## Popular Palettes for Indian Homes\n1. Earthy Terracotta with Cream\n2. Sage Green with Warm Wood\n3. Navy Blue with Gold Accents\n4. Blush Pink with Grey',
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80',
  'tips',
  ARRAY['color palette', 'living room', 'tips', 'design guide'],
  'Kushwanth BS',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Small Space, Big Impact: Design Ideas for Compact Indian Apartments',
  'small-space-design-ideas',
  'Maximize every square foot with clever design strategies tailored for urban Indian apartments.',
  'Living in a compact apartment doesn''t mean compromising on style or functionality.\n\n## Multifunctional Furniture\nInvest in pieces that serve multiple purposes - sofa beds, extendable dining tables, and storage ottomans.\n\n## Vertical Space Utilization\nLook up! Wall-mounted shelves, tall bookcases, and hanging planters maximize floor space.\n\n## Light Colors & Mirrors\nLight colors make spaces feel larger, while strategic mirror placement creates illusions of depth.\n\n## Declutter & Organize\nMinimalism isn''t just a style - it''s a necessity for small spaces.',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'tips',
  ARRAY['small spaces', 'apartments', 'compact living', 'indian homes'],
  'Kethan Hrishikesh NU',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  true,
  NOW() - INTERVAL '7 days'
),
(
  'DesignKraft Completes 500th Project Milestone',
  'designkraft-500-projects-milestone',
  'We celebrate a major milestone - 500 homes transformed across India with our AI-powered design solutions.',
  'We are thrilled to announce that DesignKraft India has successfully completed 500 interior design projects!\n\n## A Journey of Excellence\nFrom our humble beginnings in Bangalore to expanding across 50+ cities, this milestone represents the trust of thousands of homeowners.\n\n## What Makes Us Different\n- AI-powered design recommendations\n- Transparent pricing\n- Pan-India network of verified contractors\n- 100% customer satisfaction guarantee\n\n## Thank You\nTo all our customers, partners, and team members - thank you for being part of this incredible journey.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'news',
  ARRAY['company news', 'milestone', 'designkraft'],
  'Koushik P Gowda',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  true,
  NOW() - INTERVAL '10 days'
),
(
  'Vastu Shastra Meets Modern Design: Finding the Balance',
  'vastu-shastra-modern-design',
  'Learn how to incorporate traditional Vastu principles into contemporary interior design without compromising on aesthetics.',
  'Many Indian homeowners want to follow Vastu Shastra while maintaining a modern aesthetic. Here''s how to achieve both.\n\n## Key Vastu Principles\n1. Main entrance facing east or north\n2. Kitchen in the southeast\n3. Master bedroom in the southwest\n4. Avoid mirrors facing the bed\n\n## Modern Adaptations\n- Use furniture placement instead of structural changes\n- Incorporate the five elements through colors and materials\n- Balance energy flow with open-plan layouts\n\n## Our Approach\nAt DesignKraft, we respect traditional beliefs while creating contemporary spaces that feel harmonious.',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'tips',
  ARRAY['vastu', 'traditional', 'modern design', 'indian culture'],
  'Niranjan',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
  true,
  NOW() - INTERVAL '14 days'
);