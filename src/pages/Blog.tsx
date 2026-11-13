import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, Calendar, User, Clock, Search, 
  TrendingUp, Lightbulb, Newspaper, ArrowRight
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[] | null;
  author_name: string;
  author_image: string | null;
  published_at: string | null;
  view_count: number | null;
}

const categoryIcons: { [key: string]: React.ElementType } = {
  trends: TrendingUp,
  tips: Lightbulb,
  news: Newspaper,
};

const categoryColors: { [key: string]: string } = {
  trends: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  tips: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  news: 'bg-green-500/10 text-green-600 border-green-500/20',
};

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(posts.map(p => p.category))];

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <article className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              className="mb-6 gap-2"
              onClick={() => setSelectedPost(null)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
            
            {/* Article Header */}
            <div className="max-w-4xl mx-auto">
              <Badge variant="outline" className={categoryColors[selectedPost.category] || 'bg-muted'}>
                {selectedPost.category.charAt(0).toUpperCase() + selectedPost.category.slice(1)}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4 mb-6">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  {selectedPost.author_image && (
                    <img 
                      src={selectedPost.author_image} 
                      alt={selectedPost.author_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium text-foreground">{selectedPost.author_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedPost.published_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(selectedPost.content)} min read
                </div>
              </div>
              
              {/* Cover Image */}
              {selectedPost.cover_image && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                  <img 
                    src={selectedPost.cover_image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={i} className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h3 key={i} className="text-xl font-serif font-bold text-foreground mt-6 mb-3">
                        {paragraph.replace('# ', '')}
                      </h3>
                    );
                  }
                  return (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              
              {/* Tags */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                  {selectedPost.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-normal">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Newspaper className="w-3 h-3 mr-1" />
              Blog & Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Design Inspiration & Tips
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore interior design trends, expert tips, and company news from DesignKraft India.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => {
                const Icon = categoryIcons[cat] || Newspaper;
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    className="gap-2"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <CardContent className="pt-4">
                    <div className="h-4 bg-muted rounded mb-2 w-1/4" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try a different search term' : 'Check back later for new content'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const Icon = categoryIcons[post.category] || Newspaper;
                return (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.cover_image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className={`text-xs ${categoryColors[post.category] || ''}`}>
                          <Icon className="w-3 h-3 mr-1" />
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadingTime(post.content)} min
                        </span>
                      </div>
                      
                      <h3 className="font-serif font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          {post.author_image && (
                            <img 
                              src={post.author_image} 
                              alt={post.author_name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          <span className="text-xs text-muted-foreground">{post.author_name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.published_at)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
