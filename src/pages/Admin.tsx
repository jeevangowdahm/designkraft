import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import DynamicLogo from '@/components/DynamicLogo';
import {
  Users, FolderKanban, Settings, ArrowLeft, Search,
  MoreHorizontal, Shield, Edit2, Trash2, Eye, Plus,
  TrendingUp, Calendar, Mail, Phone, Crown, Activity,
  Briefcase, CheckCircle2, XCircle, Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface User {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string | null;
}

interface Project {
  id: string;
  title: string;
  status: string | null;
  room_type: string | null;
  estimated_cost: number | null;
  created_at: string | null;
  user_id: string;
}

interface Designer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string | null;
  is_active: boolean | null;
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  job_department: string | null;
  experience: string | null;
  current_company: string | null;
  portfolio_url: string | null;
  cover_letter: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string | null;
}

const Admin: React.FC = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch users (profiles)
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesData) setUsers(profilesData);

      // Fetch all projects (admin can see all)
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (projectsData) setProjects(projectsData);

      // Fetch designers
      const { data: designersData } = await supabase
        .from('designers')
        .select('*')
        .order('name');
      
      if (designersData) setDesigners(designersData);

      // Fetch job applications
      const { data: applicationsData } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (applicationsData) setApplications(applicationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600';
      case 'in_progress': return 'bg-blue-500/10 text-blue-600';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600';
      case 'reviewed': return 'bg-purple-500/10 text-purple-600';
      case 'shortlisted': return 'bg-green-500/10 text-green-600';
      case 'rejected': return 'bg-red-500/10 text-red-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ 
          status: newStatus, 
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id 
        })
        .eq('id', id);
      
      if (error) throw error;
      
      setApplications(prev => 
        prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
      );
      
      toast({
        title: 'Application Updated',
        description: `Application status changed to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application status.',
        variant: 'destructive',
      });
    }
  };

  const toggleDesignerStatus = async (id: string, currentStatus: boolean | null) => {
    try {
      const { error } = await supabase
        .from('designers')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setDesigners(prev => 
        prev.map(d => d.id === id ? { ...d, is_active: !currentStatus } : d)
      );
      
      toast({
        title: 'Designer Updated',
        description: `Designer status has been ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update designer status.',
        variant: 'destructive',
      });
    }
  };

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-500' },
    { label: 'Active Projects', value: projects.filter(p => p.status !== 'completed').length, icon: FolderKanban, color: 'text-green-500' },
    { label: 'Designers', value: designers.filter(d => d.is_active).length, icon: Crown, color: 'text-purple-500' },
    { label: 'Job Applications', value: applications.filter(a => a.status === 'pending').length, icon: Briefcase, color: 'text-orange-500' },
    { label: 'Total Revenue', value: `₹${projects.reduce((acc, p) => acc + (p.estimated_cost || 0), 0).toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-primary' },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <DynamicLogo size="sm" showName={true} />
              <Badge variant="secondary" className="gap-1">
                <Shield className="w-3 h-3" />
                Admin Panel
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview" className="gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderKanban className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="designers" className="gap-2">
              <Crown className="w-4 h-4" />
              Designers
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Applications
              {applications.filter(a => a.status === 'pending').length > 0 && (
                <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                  {applications.filter(a => a.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-card transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold font-serif mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Projects</CardTitle>
                  <CardDescription>Latest design projects from clients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.room_type || 'General'}</p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status || 'Draft'}
                      </Badge>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No projects yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New Users</CardTitle>
                  <CardDescription>Recently registered users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {users.slice(0, 5).map((u) => (
                    <div key={u.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={u.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(u.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{u.full_name || 'Unnamed User'}</p>
                        <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No users yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all registered users</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.filter(u => 
                      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {getInitials(u.full_name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{u.full_name || 'Unnamed'}</span>
                          </div>
                        </TableCell>
                        <TableCell>{u.email || '-'}</TableCell>
                        <TableCell>{u.phone || '-'}</TableCell>
                        <TableCell>
                          {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Overview of all client projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Room Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Est. Cost</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.room_type || 'General'}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status || 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          ₹{(project.estimated_cost || 0).toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell>
                          {project.created_at ? new Date(project.created_at).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Project
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {projects.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No projects yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Designers Tab */}
          <TabsContent value="designers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Designer Team</CardTitle>
                    <CardDescription>Manage your design team</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Designer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {designers.map((designer) => (
                    <Card key={designer.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(designer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={designer.is_active ?? false}
                              onCheckedChange={() => toggleDesignerStatus(designer.id, designer.is_active)}
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold font-serif text-lg">{designer.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {designer.specialization || 'Interior Designer'}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            {designer.email}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            {designer.phone}
                          </div>
                        </div>
                        <Badge 
                          className={`mt-4 ${designer.is_active ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}
                        >
                          {designer.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {designers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No designers added yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Settings</CardTitle>
                  <CardDescription>Configure your business information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" defaultValue="DesignKraft India Pvt. Ltd." className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Director & CEO</Label>
                    <Input id="ownerName" defaultValue="Jeevan Gowda H M" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="mdName">Managing Director</Label>
                    <Input id="mdName" defaultValue="Koushik P Gowda" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="contact@designkraft.in" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" className="mt-1" />
                  </div>
                  <Button className="w-full mt-4">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email for new projects</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-assign Projects</p>
                      <p className="text-sm text-muted-foreground">Automatically assign to designers</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Job Applications</CardTitle>
                        <CardDescription>Review and manage candidate applications</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.filter(a => 
                        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.job_title.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((app) => (
                        <div 
                          key={app.id} 
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedApplication?.id === app.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedApplication(app)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground">{app.name}</h4>
                                <Badge className={getStatusColor(app.status)}>
                                  {app.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-primary font-medium">{app.job_title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{app.email}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {app.created_at ? new Date(app.created_at).toLocaleDateString() : ''}
                            </span>
                          </div>
                        </div>
                      ))}
                      {applications.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No applications yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Application Detail */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Application Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedApplication ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Applicant Name</p>
                          <p className="font-medium">{selectedApplication.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Position</p>
                          <p className="font-medium">{selectedApplication.job_title}</p>
                          {selectedApplication.job_department && (
                            <p className="text-xs text-muted-foreground">{selectedApplication.job_department}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <a href={`mailto:${selectedApplication.email}`} className="text-sm text-primary hover:underline">
                              {selectedApplication.email}
                            </a>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <a href={`tel:${selectedApplication.phone}`} className="text-sm text-primary hover:underline">
                              {selectedApplication.phone}
                            </a>
                          </div>
                        </div>
                        {selectedApplication.experience && (
                          <div>
                            <p className="text-sm text-muted-foreground">Experience</p>
                            <p className="text-sm">{selectedApplication.experience}</p>
                          </div>
                        )}
                        {selectedApplication.current_company && (
                          <div>
                            <p className="text-sm text-muted-foreground">Current Company</p>
                            <p className="text-sm">{selectedApplication.current_company}</p>
                          </div>
                        )}
                        {selectedApplication.portfolio_url && (
                          <div>
                            <p className="text-sm text-muted-foreground">Portfolio</p>
                            <a 
                              href={selectedApplication.portfolio_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              View Portfolio →
                            </a>
                          </div>
                        )}
                        {selectedApplication.cover_letter && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Cover Letter</p>
                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg max-h-40 overflow-y-auto">
                              {selectedApplication.cover_letter}
                            </p>
                          </div>
                        )}
                        
                        {/* Status Actions */}
                        <div className="pt-4 border-t border-border space-y-2">
                          <p className="text-sm font-medium mb-2">Update Status</p>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="gap-1"
                              onClick={() => updateApplicationStatus(selectedApplication.id, 'reviewed')}
                            >
                              <Eye className="w-3 h-3" />
                              Reviewed
                            </Button>
                            <Button 
                              size="sm" 
                              className="gap-1 bg-green-600 hover:bg-green-700"
                              onClick={() => updateApplicationStatus(selectedApplication.id, 'shortlisted')}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Shortlist
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="gap-1"
                              onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                            >
                              <XCircle className="w-3 h-3" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Select an application to view details
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
