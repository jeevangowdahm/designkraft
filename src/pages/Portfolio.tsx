import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MapPin, Calendar, IndianRupee, ArrowRight, Eye, 
  Home, Building2, Hotel, Stethoscope, ChevronLeft, ChevronRight,
  Star, Clock, Users
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  city: string;
  state: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'healthcare';
  projectType: string;
  area: string;
  budget: string;
  duration: string;
  completionDate: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  highlights: string[];
  designer: string;
  rating: number;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Modern Mumbai Penthouse',
    client: 'Raghav & Meera Kapoor',
    city: 'Mumbai',
    state: 'Maharashtra',
    category: 'residential',
    projectType: '4BHK Penthouse',
    area: '3,500 sq.ft',
    budget: '₹45,00,000',
    duration: '4 months',
    completionDate: 'November 2025',
    beforeImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'A stunning transformation of a sea-facing penthouse in Worli, featuring contemporary Italian design with traditional Indian elements.',
    highlights: ['Custom Italian marble flooring', 'Smart home automation', 'Panoramic sea views preserved', 'Vastu-compliant design'],
    designer: 'Kushwanth BS',
    rating: 5
  },
  {
    id: '2',
    title: 'Tech Startup Office',
    client: 'InnovateTech Solutions',
    city: 'Bangalore',
    state: 'Karnataka',
    category: 'commercial',
    projectType: 'Corporate Office',
    area: '8,000 sq.ft',
    budget: '₹1,20,00,000',
    duration: '3 months',
    completionDate: 'October 2025',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    description: 'A vibrant, collaborative workspace designed for a growing tech startup in Koramangala, featuring biophilic design elements.',
    highlights: ['Biophilic design elements', 'Collaborative zones', 'Ergonomic workstations', 'Soundproof meeting pods'],
    designer: 'Kethan Hrishikesh NU',
    rating: 5
  },
  {
    id: '3',
    title: 'Heritage Home Revival',
    client: 'Dr. Anand & Lakshmi Iyer',
    city: 'Chennai',
    state: 'Tamil Nadu',
    category: 'residential',
    projectType: '5BHK Villa',
    area: '4,200 sq.ft',
    budget: '₹55,00,000',
    duration: '6 months',
    completionDate: 'September 2025',
    beforeImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Restoration and modernization of a 50-year-old heritage home in Adyar, blending colonial charm with contemporary comfort.',
    highlights: ['Heritage restoration', 'Chettinad-inspired interiors', 'Antique furniture restoration', 'Modern amenities integration'],
    designer: 'Karan Gowda H',
    rating: 5
  },
  {
    id: '4',
    title: 'Boutique Hotel Lobby',
    client: 'The Oberoi Heritage',
    city: 'Delhi',
    state: 'Delhi NCR',
    category: 'hospitality',
    projectType: 'Hotel Lobby',
    area: '6,500 sq.ft',
    budget: '₹2,50,00,000',
    duration: '5 months',
    completionDate: 'August 2025',
    beforeImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    description: 'A grand transformation of a luxury hotel lobby in Connaught Place, featuring Mughal-inspired design with modern luxury touches.',
    highlights: ['Mughal-inspired design', 'Handcrafted chandeliers', 'Italian marble reception', 'Art deco elements'],
    designer: 'Niranjan',
    rating: 5
  },
  {
    id: '5',
    title: 'Modern Healthcare Clinic',
    client: 'Apollo Wellness Center',
    city: 'Hyderabad',
    state: 'Telangana',
    category: 'healthcare',
    projectType: 'Medical Clinic',
    area: '5,000 sq.ft',
    budget: '₹85,00,000',
    duration: '4 months',
    completionDate: 'July 2025',
    beforeImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    description: 'A calming, patient-centric healthcare space in HITEC City designed to reduce anxiety and promote healing.',
    highlights: ['Calming color palette', 'Natural lighting optimization', 'Infection control design', 'Patient-centric layout'],
    designer: 'Kushwanth BS',
    rating: 5
  },
  {
    id: '6',
    title: 'Minimalist Apartment',
    client: 'Vikram & Neha Singh',
    city: 'Pune',
    state: 'Maharashtra',
    category: 'residential',
    projectType: '3BHK Apartment',
    area: '1,800 sq.ft',
    budget: '₹22,00,000',
    duration: '3 months',
    completionDate: 'June 2025',
    beforeImage: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    description: 'A Japandi-inspired minimalist home in Baner for a young professional couple who love clean, functional spaces.',
    highlights: ['Japandi aesthetic', 'Hidden storage solutions', 'Neutral color palette', 'Sustainable materials'],
    designer: 'Kethan Hrishikesh NU',
    rating: 5
  },
  {
    id: '7',
    title: 'Luxury Farmhouse',
    client: 'Rajesh Agarwal',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'residential',
    projectType: 'Farmhouse',
    area: '8,500 sq.ft',
    budget: '₹1,80,00,000',
    duration: '8 months',
    completionDate: 'May 2025',
    beforeImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    description: 'An opulent Rajasthani-themed farmhouse featuring traditional craftsmanship with modern luxury amenities.',
    highlights: ['Traditional Rajasthani crafts', 'Handmade jharokhas', 'Indoor swimming pool', 'Home theater'],
    designer: 'Karan Gowda H',
    rating: 5
  },
  {
    id: '8',
    title: 'Co-working Space',
    client: 'WeWork India',
    city: 'Kolkata',
    state: 'West Bengal',
    category: 'commercial',
    projectType: 'Co-working Space',
    area: '12,000 sq.ft',
    budget: '₹95,00,000',
    duration: '4 months',
    completionDate: 'April 2025',
    beforeImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
    description: 'A dynamic co-working space in Salt Lake City featuring Bengal-inspired design elements with modern functionality.',
    highlights: ['Bengal art installations', 'Flexible seating', 'Podcast rooms', 'Rooftop garden'],
    designer: 'Niranjan',
    rating: 5
  }
];

const categoryIcons = {
  residential: Home,
  commercial: Building2,
  hospitality: Hotel,
  healthcare: Stethoscope
};

const categoryLabels = {
  residential: 'Residential',
  commercial: 'Commercial',
  hospitality: 'Hospitality',
  healthcare: 'Healthcare'
};

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAfter, setShowAfter] = useState(true);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-charcoal to-charcoal/95 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Badge className="bg-primary/20 text-primary mb-4">Our Portfolio</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Transforming Spaces Across India
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Explore our collection of stunning interior transformations from major cities. 
              Each project tells a unique story of design excellence and client satisfaction.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                <span>50+ Cities</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span>10,000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-primary" />
                <span>4.9 Average Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-12">
                <TabsTrigger value="all" className="text-sm">All Projects</TabsTrigger>
                <TabsTrigger value="residential" className="text-sm">Residential</TabsTrigger>
                <TabsTrigger value="commercial" className="text-sm">Commercial</TabsTrigger>
                <TabsTrigger value="hospitality" className="text-sm">Hospitality</TabsTrigger>
                <TabsTrigger value="healthcare" className="text-sm">Healthcare</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const CategoryIcon = categoryIcons[project.category];
                return (
                  <Card 
                    key={project.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.afterImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                      
                      {/* Category Badge */}
                      <Badge className="absolute top-4 left-4 bg-primary/90">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {categoryLabels[project.category]}
                      </Badge>

                      {/* View Button */}
                      <Button
                        size="sm"
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <MapPin className="w-3 h-3" />
                          {project.city}, {project.state}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-muted-foreground">{project.projectType}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < project.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="bg-muted/50 rounded p-2">
                          <div className="text-xs text-muted-foreground">Area</div>
                          <div className="font-medium">{project.area}</div>
                        </div>
                        <div className="bg-muted/50 rounded p-2">
                          <div className="text-xs text-muted-foreground">Budget</div>
                          <div className="font-medium text-primary">{project.budget}</div>
                        </div>
                        <div className="bg-muted/50 rounded p-2">
                          <div className="text-xs text-muted-foreground">Duration</div>
                          <div className="font-medium">{project.duration}</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          By <span className="text-foreground font-medium">{project.designer}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of satisfied customers who trusted DesignKraft India 
              to bring their dream spaces to life.
            </p>
            <Button variant="secondary" size="lg">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              {/* Before/After Toggle */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={showAfter ? selectedProject.afterImage : selectedProject.beforeImage}
                  alt={showAfter ? 'After' : 'Before'}
                  className="w-full h-full object-cover"
                />
                
                {/* Toggle Buttons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur rounded-full p-1">
                  <Button
                    size="sm"
                    variant={!showAfter ? 'default' : 'ghost'}
                    onClick={() => setShowAfter(false)}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Before
                  </Button>
                  <Button
                    size="sm"
                    variant={showAfter ? 'default' : 'ghost'}
                    onClick={() => setShowAfter(true)}
                    className="rounded-full"
                  >
                    After
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-medium mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Client:</span>
                      <span className="font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{selectedProject.city}, {selectedProject.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{selectedProject.projectType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium text-primary">{selectedProject.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{selectedProject.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{selectedProject.completionDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">About This Project</h4>
                  <p className="text-sm text-muted-foreground mb-4">{selectedProject.description}</p>
                  
                  <h4 className="font-medium mb-2">Key Highlights</h4>
                  <ul className="space-y-1">
                    {selectedProject.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Designed by <span className="text-foreground font-medium">{selectedProject.designer}</span>
                </div>
                <Button>
                  Get Similar Design
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
