import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AvatarUpload from '@/components/AvatarUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, languageNames, Language } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { countries } from '@/data/countries';
import Room3DAnalysisPreview from '@/components/Room3DAnalysisPreview';
import {
  User, Settings, FolderKanban, ScanLine, Camera, ArrowLeft,
  Mail, Phone, Globe, MapPin, Save, Loader2, Calendar,
  Eye, Trash2, Edit2, MoreVertical, Plus, Sparkles, Box
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  description: string | null;
  room_type: string | null;
  status: string | null;
  estimated_cost: number | null;
  before_image_url: string | null;
  after_image_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface RoomAnalysis {
  id: string;
  room_type: string;
  dimensions: string | null;
  current_style: string | null;
  suggestions: any[] | null;
  mood_board: string[] | null;
  overall_score: number | null;
  image_url: string | null;
  created_at: string | null;
}

const Profile: React.FC = () => {
  const { user, profile, isLoading: authLoading, refreshProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [roomAnalyses, setRoomAnalyses] = useState<RoomAnalysis[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<RoomAnalysis | null>(null);
  const [show3DDialog, setShow3DDialog] = useState(false);

  // Profile form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('IN');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  // Load profile data
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setCountry(profile.country || 'IN');
      setSelectedLanguage((profile.language as Language) || 'en');
    }
  }, [profile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch user projects
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [user]);

  // Fetch room analyses
  useEffect(() => {
    const fetchRoomAnalyses = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('room_analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }) as { data: RoomAnalysis[] | null; error: any };

        if (error) throw error;
        setRoomAnalyses(data || []);
      } catch (error) {
        console.error('Error fetching room analyses:', error);
      } finally {
        setIsLoadingAnalyses(false);
      }
    };

    fetchRoomAnalyses();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone,
          country,
          language: selectedLanguage,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setLanguage(selectedLanguage);
      await refreshProfile();

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast({
        title: 'Project Deleted',
        description: 'The project has been removed.',
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAnalysis = async (analysisId: string) => {
    try {
      const { error } = await supabase
        .from('room_analyses')
        .delete()
        .eq('id', analysisId);

      if (error) throw error;

      setRoomAnalyses(prev => prev.filter(a => a.id !== analysisId));
      toast({
        title: 'Analysis Deleted',
        description: 'The room analysis has been removed.',
      });
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete analysis.',
        variant: 'destructive',
      });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600';
      case 'in_progress': return 'bg-blue-500/10 text-blue-600';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'bg-muted text-muted-foreground';
    if (score >= 80) return 'bg-green-500/10 text-green-600';
    if (score >= 60) return 'bg-yellow-500/10 text-yellow-600';
    return 'bg-red-500/10 text-red-600';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <AvatarUpload
                userId={user.id}
                currentAvatarUrl={profile?.avatar_url}
                fallbackText={getInitials(profile?.full_name)}
                onAvatarChange={() => refreshProfile()}
              />
              <div className="flex-1">
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  {profile?.full_name || 'Your Profile'}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="gap-1">
                    <FolderKanban className="w-3 h-3" />
                    {projects.length} Projects
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <ScanLine className="w-3 h-3" />
                    {roomAnalyses.length} Room Scans
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {formatDate(profile?.created_at || null)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="projects" className="gap-2">
                <FolderKanban className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="scans" className="gap-2">
                <ScanLine className="w-4 h-4" />
                <span className="hidden sm:inline">Room Scans</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-semibold">Your Design Projects</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage and view all your interior design projects
                  </p>
                </div>
                <Button className="gap-2 bg-gradient-copper">
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </div>

              {isLoadingProjects ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-40 bg-muted rounded-t-lg" />
                      <CardContent className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <FolderKanban className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start your first interior design project by scanning a room
                    </p>
                    <Button onClick={() => navigate('/#home')} className="gap-2">
                      <Camera className="w-4 h-4" />
                      Scan Your First Room
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map(project => (
                    <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40 bg-muted">
                        {project.before_image_url ? (
                          <img
                            src={project.before_image_url}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderKanban className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Eye className="w-4 h-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Edit2 className="w-4 h-4" />
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2 text-destructive"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <Badge 
                          className={`absolute bottom-2 left-2 ${getStatusColor(project.status)}`}
                        >
                          {project.status?.replace('_', ' ') || 'Draft'}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1 line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {project.description || 'No description'}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.created_at)}
                          </span>
                          {project.estimated_cost && (
                            <span className="font-medium text-foreground">
                              ₹{project.estimated_cost.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Room Scans Tab */}
            <TabsContent value="scans" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-semibold">Room Scans</h2>
                  <p className="text-sm text-muted-foreground">
                    AI-analyzed room scans and design suggestions
                  </p>
                </div>
                <Button onClick={() => navigate('/#home')} className="gap-2 bg-gradient-copper">
                  <ScanLine className="w-4 h-4" />
                  Scan New Room
                </Button>
              </div>

              {isLoadingAnalyses ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-40 bg-muted rounded-t-lg" />
                      <CardContent className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : roomAnalyses.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ScanLine className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Room Scans Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                      Use our AI scanner to analyze your room and get design suggestions with 3D visualization
                    </p>
                    <Button onClick={() => navigate('/#home')} variant="outline" className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      Try AI Room Scanner
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roomAnalyses.map(analysis => (
                    <Card key={analysis.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40 bg-muted">
                        {analysis.image_url ? (
                          <img
                            src={analysis.image_url}
                            alt={analysis.room_type}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ScanLine className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => {
                                  setSelectedAnalysis(analysis);
                                  setShow3DDialog(true);
                                }}
                              >
                                <Box className="w-4 h-4" />
                                View 3D Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2 text-destructive"
                                onClick={() => handleDeleteAnalysis(analysis.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <Badge 
                          className={`absolute bottom-2 left-2 ${getScoreColor(analysis.overall_score)}`}
                        >
                          Score: {analysis.overall_score || 0}/100
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{analysis.room_type}</h3>
                          <Badge variant="outline" className="text-xs">
                            {analysis.current_style}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {analysis.dimensions}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {analysis.mood_board?.slice(0, 3).map((mood, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {mood}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(analysis.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {analysis.suggestions?.length || 0} suggestions
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-semibold">Account Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your profile and preferences
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={user.email || ''}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 px-3 border rounded-md bg-muted">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter phone number"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.id} value={c.id.toUpperCase()}>
                              <span className="flex items-center gap-2">
                                <span>{c.symbol}</span>
                                <span>{c.name}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={selectedLanguage} 
                        onValueChange={(val) => setSelectedLanguage(val as Language)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(languageNames).map(([code, name]) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={isSaving}
                      className="w-full gap-2"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Danger Zone */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* 3D Preview Dialog */}
      <Dialog open={show3DDialog} onOpenChange={setShow3DDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              3D Room Preview - {selectedAnalysis?.room_type}
            </DialogTitle>
          </DialogHeader>
          {selectedAnalysis && (
            <Room3DAnalysisPreview
              roomType={selectedAnalysis.room_type}
              suggestions={selectedAnalysis.suggestions}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Profile;
