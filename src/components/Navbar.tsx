import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage, Language, languageNames, languageCategories } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import DynamicLogo from './DynamicLogo';
import { 
  Menu, X, Globe, MessageCircle, Home, Palette, FolderKanban, 
  Image, Calculator, Phone, User, LogOut, Settings, Shield, ChevronDown, Briefcase, Newspaper 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, profile, isAdmin, signOut, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { key: 'nav_home', href: '#home', icon: Home },
    { key: 'nav_services', href: '#services', icon: Palette },
    { key: 'nav_projects', href: '#projects', icon: FolderKanban },
    { key: 'nav_gallery', href: '#gallery', icon: Image },
    { key: 'Portfolio', href: '/portfolio', icon: Image, isRoute: true },
    { key: 'Blog', href: '/blog', icon: Newspaper, isRoute: true },
    { key: 'Careers', href: '/careers', icon: Briefcase, isRoute: true },
    { key: 'nav_calculator', href: '#calculator', icon: Calculator },
    { key: 'nav_contact', href: '#contact', icon: Phone },
  ];

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <DynamicLogo size="md" showName={true} showTagline={false} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.key}
                  onClick={() => navigate(item.href)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  {['Portfolio', 'Blog', 'Careers'].includes(item.key) ? item.key : t(item.key)}
                </button>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  {t(item.key)}
                </a>
              )
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{languageNames[language]}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
                {Object.entries(languageCategories).map(([category, langs]) => (
                  <React.Fragment key={category}>
                    <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">
                      {category}
                    </DropdownMenuLabel>
                    {langs.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={language === lang ? 'bg-primary/10 text-primary' : ''}
                      >
                        {languageNames[lang]}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Section */}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 pl-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium">
                      {profile?.full_name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{profile?.full_name || 'User'}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-projects')}>
                    <FolderKanban className="w-4 h-4 mr-2" />
                    My Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="text-primary">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Panel
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="hidden sm:flex"
                >
                  {t('nav_login')}
                </Button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('hero_chat')}</span>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.key}
                  onClick={() => { navigate(item.href); setIsOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors w-full text-left"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  {['Portfolio', 'Blog', 'Careers'].includes(item.key) ? item.key : t(item.key)}
                </button>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  {t(item.key)}
                </a>
              )
            ))}
            
            {user ? (
              <div className="mt-4 px-4 space-y-2">
                <div className="flex items-center gap-3 py-2 border-t border-border/50">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(profile?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full gap-2 justify-start"
                  onClick={() => { navigate('/profile'); setIsOpen(false); }}
                >
                  <User className="w-4 h-4 text-primary" />
                  My Profile
                </Button>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 justify-start"
                    onClick={() => { navigate('/admin'); setIsOpen(false); }}
                  >
                    <Shield className="w-4 h-4 text-primary" />
                    Admin Panel
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full gap-2 justify-start text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="mt-4 px-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => { navigate('/auth'); setIsOpen(false); }}
                >
                  {t('nav_login')}
                </Button>
                <Button 
                  variant="hero" 
                  className="w-full gap-2"
                  onClick={() => { navigate('/auth'); setIsOpen(false); }}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('hero_chat')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
