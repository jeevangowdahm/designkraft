import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Briefcase, MapPin, Clock, IndianRupee, Users, 
  Heart, Zap, GraduationCap, ChevronDown, ChevronUp,
  Upload, Send, Building2, ArrowLeft
} from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
}

const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Interior Designer',
    department: 'Design',
    location: 'Bangalore, Karnataka',
    type: 'Full-time',
    experience: '5-8 years',
    salary: '₹12-18 LPA',
    description: 'Lead residential and commercial interior design projects, mentor junior designers, and work closely with clients to bring their vision to life.',
    responsibilities: [
      'Lead end-to-end design projects from concept to execution',
      'Create detailed 3D visualizations and technical drawings',
      'Collaborate with contractors and vendors',
      'Mentor and guide junior design team members',
      'Present design concepts to high-value clients'
    ],
    requirements: [
      'Bachelor\'s degree in Interior Design or Architecture',
      '5+ years of experience in residential/commercial design',
      'Proficiency in AutoCAD, SketchUp, 3ds Max, V-Ray',
      'Strong portfolio showcasing completed projects',
      'Excellent communication and presentation skills'
    ],
    benefits: [
      'Health insurance for family',
      'Performance bonuses',
      'Professional development allowance',
      'Flexible work hours'
    ],
    postedDate: '2025-01-02'
  },
  {
    id: '2',
    title: 'Junior Interior Designer',
    department: 'Design',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹4-7 LPA',
    description: 'Assist senior designers in creating beautiful interior spaces while learning and growing your design skills in a collaborative environment.',
    responsibilities: [
      'Assist in creating design concepts and mood boards',
      'Prepare 2D drawings and 3D renderings',
      'Source materials and furnishings',
      'Coordinate with vendors and suppliers',
      'Maintain project documentation'
    ],
    requirements: [
      'Degree/Diploma in Interior Design',
      '1+ years of relevant experience',
      'Basic proficiency in AutoCAD and SketchUp',
      'Creative thinking and attention to detail',
      'Good communication skills in English and Hindi'
    ],
    benefits: [
      'Health insurance',
      'Learning & development programs',
      'Mentorship from senior designers',
      'Career growth opportunities'
    ],
    postedDate: '2025-01-04'
  },
  {
    id: '3',
    title: 'AI/ML Engineer',
    department: 'Technology',
    location: 'Bangalore, Karnataka (Hybrid)',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹18-28 LPA',
    description: 'Build and improve our AI-powered design recommendation system that helps millions of homeowners visualize their dream spaces.',
    responsibilities: [
      'Develop and train ML models for interior design analysis',
      'Improve image recognition and style classification algorithms',
      'Build recommendation engines for furniture and materials',
      'Collaborate with design team to understand domain requirements',
      'Deploy and monitor models in production'
    ],
    requirements: [
      'B.Tech/M.Tech in CS, AI/ML, or related field',
      '3+ years experience in ML/Deep Learning',
      'Proficiency in Python, TensorFlow/PyTorch',
      'Experience with computer vision is a plus',
      'Understanding of cloud platforms (AWS/GCP)'
    ],
    benefits: [
      'Competitive salary + ESOPs',
      'Health insurance for family',
      'Remote work flexibility',
      'Conference & learning budget'
    ],
    postedDate: '2024-12-28'
  },
  {
    id: '4',
    title: 'Project Manager',
    department: 'Operations',
    location: 'Delhi NCR',
    type: 'Full-time',
    experience: '4-6 years',
    salary: '₹10-15 LPA',
    description: 'Oversee multiple interior design projects, ensuring timely delivery, budget adherence, and client satisfaction.',
    responsibilities: [
      'Manage end-to-end project execution',
      'Coordinate between designers, contractors, and clients',
      'Track project timelines and budgets',
      'Resolve on-site issues and escalations',
      'Ensure quality standards are maintained'
    ],
    requirements: [
      'Bachelor\'s degree in any field (Architecture/Interior Design preferred)',
      '4+ years of project management experience',
      'Experience in interior design or construction industry',
      'Strong organizational and leadership skills',
      'Proficiency in project management tools'
    ],
    benefits: [
      'Health insurance',
      'Travel allowance',
      'Performance incentives',
      'Work-life balance focus'
    ],
    postedDate: '2025-01-01'
  },
  {
    id: '5',
    title: 'Design Intern',
    department: 'Design',
    location: 'Chennai, Tamil Nadu',
    type: 'Internship',
    experience: 'Fresher',
    salary: '₹15,000-20,000/month',
    description: 'A 6-month internship program for fresh graduates to learn practical interior design skills while working on real projects.',
    responsibilities: [
      'Assist in creating design presentations',
      'Learn 3D modeling and rendering',
      'Support senior designers in client projects',
      'Participate in site visits and vendor meetings',
      'Contribute creative ideas to design discussions'
    ],
    requirements: [
      'Final year student or recent graduate in Interior Design',
      'Basic knowledge of design software',
      'Strong willingness to learn',
      'Good communication skills',
      'Portfolio or design samples preferred'
    ],
    benefits: [
      'Stipend',
      'Certificate on completion',
      'Full-time offer for top performers',
      'Hands-on project experience'
    ],
    postedDate: '2025-01-05'
  },
  {
    id: '6',
    title: 'Sales Executive',
    department: 'Sales',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹5-8 LPA + Incentives',
    description: 'Drive business growth by connecting with potential clients and converting leads into successful interior design projects.',
    responsibilities: [
      'Generate and qualify leads through various channels',
      'Conduct initial client consultations',
      'Present design packages and pricing',
      'Achieve monthly and quarterly sales targets',
      'Maintain CRM and follow up with prospects'
    ],
    requirements: [
      'Bachelor\'s degree in any field',
      '2+ years of sales experience (interior/real estate preferred)',
      'Excellent communication and negotiation skills',
      'Goal-oriented mindset',
      'Fluency in Telugu, Hindi, and English'
    ],
    benefits: [
      'Base salary + attractive incentives',
      'Health insurance',
      'Mobile and travel allowance',
      'Fast-track career growth'
    ],
    postedDate: '2025-01-03'
  }
];

const benefits = [
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical coverage for you and your family' },
  { icon: GraduationCap, title: 'Learning Budget', description: '₹50,000 annual budget for courses and certifications' },
  { icon: Zap, title: 'Flexible Hours', description: 'Work when you\'re most productive, maintain work-life balance' },
  { icon: Users, title: 'Team Events', description: 'Regular team outings, celebrations, and design workshops' },
];

const Careers: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    portfolio: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleApply = (job: JobOpening) => {
    setSelectedJob(job);
    // Scroll to application form
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          job_title: selectedJob?.title || 'General Application',
          job_department: selectedJob?.department || null,
          experience: formData.experience.trim() || null,
          current_company: formData.currentCompany.trim() || null,
          portfolio_url: formData.portfolio.trim() || null,
          cover_letter: formData.coverLetter.trim() || null,
        });

      if (error) throw error;
      
      toast({
        title: 'Application Submitted!',
        description: `Thank you for applying for ${selectedJob?.title || 'a position'}. Our HR team will review your application and get back to you soon.`,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        currentCompany: '',
        portfolio: '',
        coverLetter: ''
      });
      setSelectedJob(null);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive'
      });
    }
    
    setIsSubmitting(false);
  };

  const getTypeColor = (type: JobOpening['type']) => {
    switch (type) {
      case 'Full-time': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Part-time': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Contract': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'Internship': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
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
              <Briefcase className="w-3 h-3 mr-1" />
              We're Hiring
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Join Our <span className="text-primary">Creative Team</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of India's leading AI-powered interior design company. We're looking for 
              passionate individuals who want to transform how people design their homes.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-5 h-5 text-primary" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>6 Cities Across India</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>{jobOpenings.length} Open Positions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-12">
            Why Work With Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-4">
            Open Positions
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find your perfect role and start your journey with DesignKraft India
          </p>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {jobOpenings.map((job) => (
              <Card 
                key={job.id} 
                className={`border-border/50 overflow-hidden transition-all duration-300 ${
                  expandedJob === job.id ? 'shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl font-semibold text-foreground">
                          {job.title}
                        </CardTitle>
                        <Badge variant="outline" className={getTypeColor(job.type)}>
                          {job.type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                      >
                        Apply Now
                      </Button>
                      {expandedJob === job.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {expandedJob === job.id && (
                  <CardContent className="pt-0 border-t border-border/50 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-6 py-6">
                      <div>
                        <p className="text-muted-foreground mb-6">{job.description}</p>
                        
                        <h4 className="font-semibold text-foreground mb-3">Responsibilities</h4>
                        <ul className="space-y-2 mb-6">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
                        <ul className="space-y-2 mb-6">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit, i) => (
                            <Badge key={i} variant="secondary" className="font-normal">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">
                        Posted on {new Date(job.postedDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', month: 'long', year: 'numeric' 
                        })}
                      </span>
                      <Button onClick={() => handleApply(job)}>
                        Apply for this Position
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-4">
              {selectedJob ? `Apply for ${selectedJob.title}` : 'Submit Your Application'}
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              {selectedJob 
                ? `We're excited that you're interested in joining as ${selectedJob.title}!`
                : 'Select a position above or submit a general application'
              }
            </p>
            
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {selectedJob && (
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{selectedJob.title}</p>
                          <p className="text-sm text-muted-foreground">{selectedJob.location} • {selectedJob.type}</p>
                        </div>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedJob(null)}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        required
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Years of Experience
                      </label>
                      <Input
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="e.g., 3 years"
                        maxLength={20}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Current Company
                      </label>
                      <Input
                        value={formData.currentCompany}
                        onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                        placeholder="Company name (if employed)"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Portfolio / LinkedIn URL
                      </label>
                      <Input
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="https://"
                        maxLength={500}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Cover Letter / Why do you want to join us?
                    </label>
                    <Textarea
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Tell us about yourself and why you'd be a great fit..."
                      rows={5}
                      maxLength={2000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.coverLetter.length}/2000 characters
                    </p>
                  </div>
                  
                  <div className="p-4 border-2 border-dashed border-border rounded-xl text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Resume upload coming soon. For now, please include your LinkedIn or portfolio link above.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our privacy policy. We'll only use your information for recruitment purposes.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
