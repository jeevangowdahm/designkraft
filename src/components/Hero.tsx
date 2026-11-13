import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sparkles, Play, ScanLine } from 'lucide-react';
import ARCamera from '@/components/ARCamera';
import RoomDropzone from '@/components/RoomDropzone';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Design Solutions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight">
              {t('hero_title')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="gap-2">
                {t('hero_cta')}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  const demoSection = document.getElementById('demo-video');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* AR Camera CTA Section */}
            <div className="pt-6">
              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-copper/10 to-secondary/10 border border-primary/20 overflow-hidden">
                {/* Animated scan line effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-copper flex items-center justify-center shadow-lg">
                      <ScanLine className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-lg text-foreground mb-1">
                      Scan Your Room with AI
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant design suggestions powered by AI
                    </p>
                  </div>
                  <ARCamera />
                </div>
              </div>
            </div>

            {/* Drag & Drop Upload Section */}
            <div className="pt-4">
              <RoomDropzone 
                onAnalysisComplete={(result, imageData) => {
                  console.log('Room analyzed:', result.roomType);
                }}
              />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl font-serif font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg-soft">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                alt="Modern interior design"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -left-8 bottom-20 bg-card p-4 rounded-2xl shadow-card border border-border/50 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">AI Analysis</div>
                  <div className="text-xs text-muted-foreground">Space optimized 100%</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-primary/20 rounded-2xl" />
            <div className="absolute -left-4 -bottom-4 w-32 h-32 border-2 border-secondary/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
