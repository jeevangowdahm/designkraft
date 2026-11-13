import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, DollarSign, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Modern Villa Renovation',
    client: 'Johnson Family',
    progress: 75,
    budget: { total: 85000, spent: 62000 },
    deadline: '2024-02-15',
    status: 'on-track',
    phases: [
      { name: 'Design Concept', status: 'completed' },
      { name: 'Material Selection', status: 'completed' },
      { name: 'Demolition', status: 'completed' },
      { name: 'Construction', status: 'in-progress' },
      { name: 'Finishing', status: 'pending' },
    ],
  },
  {
    id: 2,
    name: 'Corporate Office Space',
    client: 'TechCorp Inc.',
    progress: 45,
    budget: { total: 150000, spent: 58000 },
    deadline: '2024-03-30',
    status: 'on-track',
    phases: [
      { name: 'Space Planning', status: 'completed' },
      { name: 'Design Development', status: 'completed' },
      { name: 'Procurement', status: 'in-progress' },
      { name: 'Installation', status: 'pending' },
      { name: 'Final Review', status: 'pending' },
    ],
  },
  {
    id: 3,
    name: 'Boutique Hotel Lobby',
    client: 'Grand Hotels',
    progress: 90,
    budget: { total: 200000, spent: 185000 },
    deadline: '2024-01-20',
    status: 'at-risk',
    phases: [
      { name: 'Concept Design', status: 'completed' },
      { name: 'Custom Furniture', status: 'completed' },
      { name: 'Lighting Design', status: 'completed' },
      { name: 'Art Installation', status: 'completed' },
      { name: 'Final Touches', status: 'in-progress' },
    ],
  },
];

const ProjectTracker: React.FC = () => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-sage/20 text-sage';
      case 'at-risk':
        return 'bg-accent/20 text-accent';
      case 'delayed':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-sage" />;
      case 'in-progress':
        return <Circle className="w-4 h-4 text-primary animate-pulse-soft" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground/30" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const daysUntil = (dateStr: string) => {
    const today = new Date();
    const deadline = new Date(dateStr);
    const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('projects_title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            Track your project progress, budget, and milestones in real-time
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden hover:shadow-lg-soft transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Project Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{t('projects_progress')}</span>
                        <span className="font-semibold text-foreground">{project.progress}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-copper rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Phases */}
                    <div className="flex flex-wrap items-center gap-3">
                      {project.phases.map((phase, i) => (
                        <div
                          key={phase.name}
                          className="flex items-center gap-2"
                        >
                          {getPhaseIcon(phase.status)}
                          <span className={`text-sm ${phase.status === 'in-progress' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                            {phase.name}
                          </span>
                          {i < project.phases.length - 1 && (
                            <div className="w-8 h-px bg-border ml-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 lg:w-80">
                    {/* Budget */}
                    <div className="bg-muted/50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{t('projects_budget')}</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {formatCurrency(project.budget.spent)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        of {formatCurrency(project.budget.total)}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="bg-muted/50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{t('projects_deadline')}</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                        {daysUntil(project.deadline)} days
                        {daysUntil(project.deadline) < 14 && (
                          <AlertCircle className="w-4 h-4 text-accent" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectTracker;
