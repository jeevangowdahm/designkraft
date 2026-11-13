import React from 'react';
import { Sparkles, Home } from 'lucide-react';

interface DynamicLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  showTagline?: boolean;
  animated?: boolean;
}

const DynamicLogo: React.FC<DynamicLogoProps> = ({ 
  size = 'md', 
  showName = true,
  showTagline = false,
  animated = true 
}) => {
  const sizes = {
    sm: { logo: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg', tagline: 'text-xs' },
    md: { logo: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl', tagline: 'text-xs' },
    lg: { logo: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-2xl', tagline: 'text-sm' },
    xl: { logo: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-3xl', tagline: 'text-base' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`relative ${s.logo}`}>
        {/* Outer glow ring */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-copper opacity-50 blur-sm ${
            animated ? 'animate-pulse' : ''
          }`} 
        />
        
        {/* Main logo container */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-copper flex items-center justify-center shadow-copper overflow-hidden">
          {/* Inner decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />
          
          {/* DK initials combined with home icon */}
          <div className="relative flex items-center justify-center">
            <Home className={`${s.icon} text-primary-foreground opacity-40 absolute`} />
            <span className="font-serif font-bold text-primary-foreground text-[0.6em] relative z-10">DK</span>
          </div>
          
          {/* Sparkle accent */}
          <Sparkles className="absolute top-0.5 right-0.5 w-2 h-2 text-primary-foreground/70" />
        </div>

        {/* Floating particles */}
        {animated && (
          <>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary/50 rounded-full animate-float" />
            <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-secondary/50 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          </>
        )}
      </div>

      {/* Text */}
      {showName && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className={`font-serif font-bold ${s.text} text-foreground`}>DesignKraft</span>
            <span className={`font-serif font-medium ${s.text} text-primary`}>India</span>
          </div>
          {showTagline && (
            <span className={`${s.tagline} text-muted-foreground`}>AI-Powered Interior Design</span>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicLogo;
