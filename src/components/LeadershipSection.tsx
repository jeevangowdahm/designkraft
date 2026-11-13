import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Twitter, Mail, Award, Users, Building2 } from 'lucide-react';
import jeevanPhoto from '@/assets/team/jeevan-gowda.jpg';
import koushikPhoto from '@/assets/team/koushik-gowda.jpg';

interface Leader {
  id: string;
  name: string;
  role: string;
  title: string;
  image: string;
  bio: string;
  achievements: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const leaders: Leader[] = [
  {
    id: '1',
    name: 'Jeevan Gowda H M',
    role: 'Founder',
    title: 'Director, CEO & Owner',
    image: jeevanPhoto,
    bio: 'Visionary entrepreneur with 15+ years of experience in interior design and technology. Founded DesignKraft India with a mission to democratize luxury interior design using AI and make it accessible to every Indian household.',
    achievements: [
      'Featured in Forbes India 30 Under 30',
      'Winner of National Design Excellence Award 2023',
      'Transformed 10,000+ homes across India'
    ],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'jeevan@designkraft.in'
    }
  },
  {
    id: '2',
    name: 'Koushik P Gowda',
    role: 'Co-Founder',
    title: 'Managing Director',
    image: koushikPhoto,
    bio: 'Strategic leader with expertise in business operations and scaling startups. Oversees pan-India operations and strategic partnerships. Previously led operations at leading PropTech companies.',
    achievements: [
      'Scaled operations to 50+ cities in India',
      'Built partnerships with 200+ contractors',
      'MBA from IIM Bangalore'
    ],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'koushik@designkraft.in'
    }
  }
];

const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 bg-gradient-to-br from-charcoal to-charcoal/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Our Leadership
          </span>
          <h2 className="font-serif text-4xl font-bold text-primary-foreground mb-4">
            Meet the Visionaries
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Led by industry veterans who are passionate about transforming Indian homes 
            with innovative design solutions and cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader) => (
            <Card 
              key={leader.id} 
              className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-2/5 relative">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent lg:bg-gradient-to-r" />
                    
                    {/* Role Badge */}
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {leader.role}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-6 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-primary font-medium">{leader.title}</p>
                    </div>

                    <p className="text-primary-foreground/70 text-sm mb-4 flex-grow">
                      {leader.bio}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-xs uppercase tracking-wider text-primary-foreground/50 mb-2 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-1">
                        {leader.achievements.map((achievement, i) => (
                          <li key={i} className="text-xs text-primary-foreground/60 flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      {leader.social.linkedin && (
                        <a
                          href={leader.social.linkedin}
                          className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-primary-foreground" />
                        </a>
                      )}
                      {leader.social.twitter && (
                        <a
                          href={leader.social.twitter}
                          className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-primary-foreground" />
                        </a>
                      )}
                      {leader.social.email && (
                        <a
                          href={`mailto:${leader.social.email}`}
                          className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-primary-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Building2, label: 'Cities Covered', value: '50+' },
            { icon: Users, label: 'Happy Customers', value: '10,000+' },
            { icon: Award, label: 'Design Awards', value: '25+' },
            { label: 'Years of Excellence', value: '10+', icon: Building2 }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
